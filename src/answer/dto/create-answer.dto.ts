import { ApiProperty } from "@nestjs/swagger";
import { Question } from "src/question/entities/question.entity";

export class CreateAnswerDto {
    @ApiProperty()
    answer: string
    @ApiProperty()
    status: number
    @ApiProperty()
    questionId: number
}
