import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        categoryId: { type: 'number' },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              answers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    answer: { type: 'string' },
                    status: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/findByCategoryId/:id')
  findByCategoryId(@Param('id') id: string) {
    return this.testService.findByCategoryId(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
