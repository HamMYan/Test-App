import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { HasRoles } from './has-roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, Login } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UserTestService } from 'src/user-test/user-test.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() user: Login) {
    return this.authService.login(req.user);
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.USER)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async onlyUser(@Request() req) {
    return await this.userService.findOneById(req.user.id);
  }
}
