import { PartialType } from '@nestjs/swagger';
import { CreateUserTestDto } from './create-user-test.dto';

export class UpdateUserTestDto extends PartialType(CreateUserTestDto) {}
