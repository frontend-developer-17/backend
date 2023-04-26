import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
 
  @ApiProperty()
  @IsString()
  token: string;
}
