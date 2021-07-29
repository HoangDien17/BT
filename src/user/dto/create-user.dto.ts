import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEnum, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({description: 'User is numberic and {3, 8} characters'})
  @Length(3,8,)
  @IsAlphanumeric()
  username: string;

  @ApiProperty({description: 'User is numberic at least 6 characters'})
  @Length(6,)
  @IsAlphanumeric()
  password: string;
}
export class UserLoginDto {
  @ApiProperty()
  @Length(3,8)
  @IsAlphanumeric()
  username: string;

  @ApiProperty()
  @Length(6,)
  @IsAlphanumeric()
  password: string;
}

export enum Role {
  Admin = 'admin',
  Custom = 'custom'
}
export class UpdateRoleDto {
  @ApiProperty()
  @IsEnum(Role)
  role: Role
}


