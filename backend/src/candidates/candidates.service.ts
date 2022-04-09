import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateCandidateDto} from './dto';
import {Candidate} from './schemas/candidate.schema';

@Injectable()
export class CandidatesService {
    constructor(
        @InjectModel(Candidate.name) private readonly candidateModel: Model<Candidate>,
    ) {}
    public async createCandidate(
        createCandidateDto: CreateCandidateDto,
        ) {
        let candidate = await this.candidateModel
            .findOne({ identityNumber: createCandidateDto.identityNumber })
            .exec();

        if (!candidate) {
            candidate = new this.candidateModel(createCandidateDto);
            return candidate.save();
        } else {
            return this.candidateModel.updateOne(
                {identityNumber: createCandidateDto.identityNumber},
                createCandidateDto,
            );
        }
    }
}
