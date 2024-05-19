import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UpdateUserTestDto } from './dto/update-user-test.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('user test')
@Controller('user-test')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Post()
  async create(@Body() createUserTestDto: CreateUserTestDto, @Req() req) {
      return await this.userTestService.create(createUserTestDto, req.user.id);
  }
  
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTestDto: UpdateUserTestDto) {
    return this.userTestService.update(+id, updateUserTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTestService.remove(+id);
  }
}
