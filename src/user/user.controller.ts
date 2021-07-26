import { Get, Post, Body, HttpCode, Req, Res, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.userService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.userService.login(
      userLoginDto,
    );
  }
}
