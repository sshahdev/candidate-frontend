import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidatesModule } from './candidates/candidates.module';

// kQ8Bmjhj
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://snehalshah:kQ8Bmjhj@cluster0.ohntj.mongodb.net/candidateDB?retryWrites=true&w=majority'), CandidatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
