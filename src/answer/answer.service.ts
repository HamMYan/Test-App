import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';


@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) { }
  async create(createAnswerDto: CreateAnswerDto) {
    return await this.answerRepository.save({ ...createAnswerDto })
  }

  async findAll() {
    return await this.answerRepository.find()
  }

  async findOne(id: number) {
    return await this.answerRepository.findOneBy({ id })
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    await this.answerRepository.update(id, {
      ...updateAnswerDto
    })
    return "Updated"
  }

  async remove(id: number) {
    await this.answerRepository.delete(id)
    return " Deleted"
  }
}
