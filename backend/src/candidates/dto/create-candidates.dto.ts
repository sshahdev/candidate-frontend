import {MaxLength, IsNotEmpty, IsEmail, IsString, IsOptional, MinLength, Length} from 'class-validator';

export class CreateCandidateDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(13)
    readonly identityNumber: string;

    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    readonly mobileNumber: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly addressLine1: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    readonly addressLine2: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly country: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly city: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly province: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    readonly postalCode: string;

    @IsOptional()
    @IsString()
    readonly linkedinProfile: string;

    @IsOptional()
    @IsString()
    readonly facebookProfile: string;

    @IsOptional()
    @IsString()
    readonly twitterProfile: string;
}
