import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateSchema, Candidate } from './schemas/candidate.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Candidate.name, schema: CandidateSchema },
        ]),
    ],
    providers: [CandidatesService],
    controllers: [CandidatesController],
})
export class CandidatesModule {}
