import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Test } from 'src/test/entities/test.entity';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports:[TypeOrmModule.forFeature([Question,Test]),AnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
