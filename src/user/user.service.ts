import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto, UpdateRoleDto, UserLoginDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto} from 'src/dto-config/dtoConfig';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private jwtService: JwtService) {}
  async register(createUser: CreateUserDto): Promise<User> {
    const { username, password } = createUser;
    // check user exists
    const user: User = await this.userModel.findOne({ username: username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const saltRounds = 10;
    const newItem: CreateUserDto = {
      username: username,
      password: bcrypt.hashSync(password, saltRounds),
    };
    const resultCreate: User = await this.userModel.create(newItem);
    return resultCreate;
  }

  async login(userLogin: UserLoginDto): Promise<any> {
    const { username, password } = userLogin;
    const user: User = await this.userModel.findOne({ username: username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED)
    }
    const payload: PayloadDto = {
      id: user._id,
      role: user.role,
    }
    console.log(payload)
    console.log(process.env.SECRET_KEY)
    console.log(this.jwtService);
    try {
      const jwt = await this.jwtService.signAsync(payload);
      console.log('jwt', jwt)
      return {token: jwt};
    }
    catch(error) {
      console.log(error)
    }
    
    
  }

  async updateRole(confirmId: string, updateRoleDto: UpdateRoleDto): Promise<any> {
    const { role } = updateRoleDto;
    await this.userModel.updateOne({_id: confirmId}, {role: role});
    return { message: 'Update role successful'}
  }
}
