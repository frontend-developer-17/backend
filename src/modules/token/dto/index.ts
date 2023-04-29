import { IsOptional, IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  firstName: string;
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsOptional()
  id?: string;
}
