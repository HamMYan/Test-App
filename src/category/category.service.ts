import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save({ ...createCategoryDto });
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    return await this.categoryRepository.findBy({ id })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, { ...updateCategoryDto })
    return "Updated"
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id)
    return `Deleted`;
  }
}
