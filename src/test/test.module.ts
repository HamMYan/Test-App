import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Test } from './entities/test.entity';
import { QuestionModule } from 'src/question/question.module';
import { AnswerModule } from 'src/answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test, Category]),
    QuestionModule,
    AnswerModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
