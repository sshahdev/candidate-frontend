import {
    Controller,
    Res,
    HttpStatus,
    Post,
    Body, UsePipes,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto';
import { IdentityNumberCheckPipe } from "./identity-number-check";

@Controller('api/candidates')
export class CandidatesController {
    constructor(private candidatesService: CandidatesService) {}
    @Post()
    @UsePipes(new IdentityNumberCheckPipe())
    public async addCandidate(
        @Res() res,
        @Body() createCandidateDto: CreateCandidateDto) {
        try {
            const candidate = await this.candidatesService.createCandidate(createCandidateDto);
            return res.status(HttpStatus.OK).json({
                message: 'Candidate has been created successfully',
                candidate,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Candidate not created!',
                status: 400,
            });
        }
    }
}
