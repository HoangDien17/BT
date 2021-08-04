import { Get, Post, Body, HttpCode, Req, Res, Delete, UseGuards, Put, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateRoleDto, UserLoginDto } from './dto/create-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponseProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/role.decorator';


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

  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard(), RolesGuard)
  @ApiOkResponse({description: 'Update role successful'})
  @ApiUnauthorizedResponse({description: 'Invalid username or password'})
  @Put(':id')
  async updateRole(@Param('id') id: string, @Body() role: UpdateRoleDto) {
    return await this.userService.updateRole(
      id, role
    );
  }

}