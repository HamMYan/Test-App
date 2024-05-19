import { Module } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { UserTestController } from './user-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTest } from './entities/user-test.entity';
import { Test } from 'src/test/entities/test.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserTest,Test,User])],
  controllers: [UserTestController],
  providers: [UserTestService],
  exports: [UserTestModule]
})
export class UserTestModule {}
