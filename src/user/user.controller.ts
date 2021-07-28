import { Get, Post, Body, HttpCode, Req, Res, Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiResponseProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiCreatedResponse({type: CreateUserDto, description: 'Create a new user succesful'})
  @ApiBadRequestResponse({description: 'Invalid username or password'})
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.userService.register(createUserDto);
  }

  @ApiOkResponse({type: UserLoginDto, description: 'Login successful'})
  @ApiUnauthorizedResponse({description: 'Invalid username or password'})
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.userService.login(
      userLoginDto,
    );
  }
}
