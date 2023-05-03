import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/modules/app/users/model/user.model';

export class WatchListDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  assets: string;
}

export class CreateWatchList {
  @ApiProperty()
 
  user: User;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  assets: string;
}
