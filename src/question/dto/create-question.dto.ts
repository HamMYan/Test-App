import { ApiProperty } from "@nestjs/swagger";
import { Test } from "src/test/entities/test.entity";

export class CreateQuestionDto {
    @ApiProperty()
    question: string
    @ApiProperty()
    testId: number
}
