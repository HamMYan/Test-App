import { ApiProperty } from "@nestjs/swagger"

export class CreateUserTestDto {
    @ApiProperty()
    rating: number
    @ApiProperty()
    testId: number
}
