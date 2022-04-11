import {
    ArgumentMetadata, BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';

@Injectable()
export class IdentityNumberCheckPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        let identityNumber = value.identityNumber.replace(/ /g, '');
        identityNumber = identityNumber.replace(/-/g, '');
        const splitNumber = [...identityNumber];
        if(splitNumber.length != 13) {
            throw new BadRequestException('Identity Number is not valid');
        }
        const nonce = parseInt(splitNumber.pop());
        let sum = 0;
        splitNumber.forEach((number, index) => {
            let digit = parseInt(number);
            if (index % 2) {
                digit = digit * 2;
                if (digit > 9) digit -= 9
            }
            sum += digit
        });

        if (sum % 10 === 0) {
            return value;
        } else {
            let number = 10 - (sum % 10);
            if(number === nonce) {
                return value;
            }
        }
        throw new BadRequestException('Identity Number is not valid');
    }
}
