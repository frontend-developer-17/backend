import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateWatchList } from 'src/modules/watch-list/dto';

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

export class AuthLoginDto {
  @ApiProperty()
  user: LoginDto;
  @ApiProperty()
  watchList: CreateWatchList;
}
