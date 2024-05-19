import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Category } from 'src/category/entities/category.entity';
import { QuestionService } from 'src/question/question.service';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    private readonly answerService: AnswerService,
    private readonly questionService: QuestionService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Test) private testRepository: Repository<Test>,
  ) {}
  async create(createTestDto: CreateTestDto) {
    console.log(createTestDto);
    const categoryId = createTestDto.categoryId;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (category) {
      const test = await this.testRepository.save({
        name: createTestDto.name,
        archive: 1,
        category: category,
      });
      const { questions } = createTestDto;
      if (questions && questions.length) {
        for (let e of questions) {
          const quest = await this.questionService.create({
            question: e.question,
            testId: test.id,
          });
          console.log(quest);

          const { answers } = e;
          if (answers && answers.length) {
            for (let elm of answers) {
              const ans = await this.answerService.create({
                answer: elm.answer,
                status: elm.status,
                questionId: quest.id,
              });
              console.log(ans);
            }
          }
        }
      }
      return 'Added';
    } else {
      return 'Category not found';
    }
  }

  async findAll() {
    return await this.testRepository.find();
  }

  async findByCategoryId(id: number) {
    return this.testRepository.find({
      where: {
        categoryId: id,
      },
    });
  }
  

  async update(id: number, updateTestDto: UpdateTestDto) {
    const test = await this.testRepository.findBy({ id });
    if (test) {
      return await this.testRepository.update(id, updateTestDto);
    } else {
      return 'Test not found';
    }
  }

  async remove(id: number) {
    const testToRemove = await this.testRepository.findOneBy({ id });
    await this.testRepository.remove(testToRemove);
    return `Test removed`;
  }
}
