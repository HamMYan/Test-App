import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Test } from '@nestjs/testing';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
    @ApiProperty()
    question: string
}
