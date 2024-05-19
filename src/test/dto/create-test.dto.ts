import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/entities/category.entity";
import { Question } from "src/question/entities/question.entity";
import { Test } from "../entities/test.entity";

export class CreateTestDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: number; 

  @ApiProperty()
  questions:Question[]
}
