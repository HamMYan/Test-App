import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@ApiTags('test')
@Injectable()
export class QuestionService {
  constructor(
    private readonly answerService: AnswerService,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const data = await this.questionRepository.save({
      ...createQuestionDto,
    });
    return data
  }

  async findAll() {
    return await this.questionRepository.find()
  }

  async findOne(id: number) {
    return await this.questionRepository.findOneBy({id})
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOneBy({id})
    if(question){
      await this.questionRepository.update(id,{...updateQuestionDto})
      return 'Updated'
    }
    else{
      return 'question not found'
    }
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneBy({id})
    if(question){
      await this.questionRepository.delete(id)
      return `Deleted`;
    }
    else{
      return 'question not found'
    }
  }
}
