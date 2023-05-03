import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateWatchList } from 'src/modules/watch-list/dto';
import { WatchList } from 'src/modules/watch-list/watchList.model';

export class LoginDto {
  @ApiProperty()
  @IsString()
  id?: string;
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
  @IsString()
  createdAt?: string;
  @ApiProperty()
  @IsString()
  updatedAt?: string;
  @ApiProperty()
  watchList: CreateWatchList[];
}

export class AuthLoginDto {
  @ApiProperty()
  user: LoginDto;
  @ApiProperty()
  @IsString()
  token: string;
}
