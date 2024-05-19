import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Question } from 'src/question/entities/question.entity';
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @ApiProperty()
    answer: string
    @ApiProperty()
    status: number
    @ApiProperty()
    questionId: number
}
