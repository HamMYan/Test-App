import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { QuestionModule } from './question/question.module';
import { TestModule } from './test/test.module';
import { AnswerModule } from './answer/answer.module';
import { Test } from './test/entities/test.entity';
import { Question } from './question/entities/question.entity';
import { Answer } from './answer/entities/answer.entity';
import { UserTestModule } from './user-test/user-test.module';
import { UserTest } from './user-test/entities/user-test.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'Pass@1234',
      database: 'test_app',
      entities: [User, Category, Test, Question, Answer, UserTest],
      synchronize: true,
    }),
    QuestionModule,
    TestModule,
    AnswerModule,
    UserTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
