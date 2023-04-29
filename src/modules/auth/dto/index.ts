import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthLoginServise{
  @ApiProperty()
  user:LoginUserDto
  @ApiProperty()

  @IsString()
  token:string
}