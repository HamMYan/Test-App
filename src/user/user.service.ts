import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('email has already');
    } else {
      await this.userRepository.save({
        ...createUserDto,
      });
      return 'Register success';
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(username: string): Promise<User | null> {
    // return this.users.find((user) => user.username === username);
    const user = await this.userRepository.findOneBy({ email: username });
    return user;
  }
  async findOneById(id:number){
    // return this.users.find((user) => user.username === username);
    const user = await this.userRepository
    .createQueryBuilder("user")
    .where("user.id =:id", {id})
    .innerJoinAndSelect("user.userTest", "user_test")
    .innerJoinAndSelect("user_test.test", "test")
    .getOne()
    return {...user, rating:user.userTest.reduce((a, b)=>a+b.rating, 0)/user.userTest.length};
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      await this.userRepository.update(id, updateUserDto);
      return 'User updated'
    }else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if(user){
      await this.userRepository.delete(id);
      return 'User deleted';
    }else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  
}
