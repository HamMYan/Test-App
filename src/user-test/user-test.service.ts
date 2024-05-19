import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UpdateUserTestDto } from './dto/update-user-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTest } from './entities/user-test.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Test } from 'src/test/entities/test.entity';

@Injectable()
export class UserTestService {
  constructor(
    @InjectRepository(UserTest)
    private userTestRepasitory: Repository<UserTest>,
    @InjectRepository(User) private userRepasitory: Repository<User>,
    @InjectRepository(Test) private testRepasitory: Repository<Test>,
  ) {}
  async create(createTestDto: CreateUserTestDto, userId: number) {
    const test = await this.testRepasitory.findOneBy({
      id: createTestDto.testId,
    });
    const user = await this.userRepasitory.findOneBy({ id: userId });
    if (test && user) {
      const usertest = await this.userTestRepasitory.findOneBy({
        user,test
      })
      if(usertest){
        throw new BadRequestException("usertest has already")
      }else{
        return await this.userTestRepasitory.save({
          rating: createTestDto.rating,
          test, user
        });
      }
     
    }else{
      throw new BadRequestException("user or test not found")
    }
  }

  async findAll() {
    return await this.userTestRepasitory.find({
      relations: {
        user: true,
        test: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userTest`;
  }

  update(id: number, updateUserTestDto: UpdateUserTestDto) {
    return `This action updates a #${id} userTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} userTest`;
  }
}
