import { Injectable } from '@nestjs/common';
import { UserService } from '../app/users/user.service';
import { CreateUserDto } from '../app/users/dto';
import { BadRequestException } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { LoginUserDto } from './dto/index';
import * as bcrypt from 'bcrypt';
import { TokenService } from './../token/token.service';
import { AuthLoginDto, LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async requestUser(dto: CreateUserDto): Promise<AuthLoginDto>  {
    try {
      const register = await this.userService.findUserEmail(dto.email);
      if (register) throw new BadRequestException(AppError.USER_EXIST);
      await this.userService.createUser(dto);
      return this.userService.publicUser(dto.email);
    } catch (err) {
      throw new Error(err);
    }
  }

  async loginUser(dto: LoginUserDto): Promise<AuthLoginDto> {
    const register = await this.userService.findUserEmail(dto.email);
    if (!register) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const password = bcrypt.compare(dto.password, register.password);
    if (!password) throw new BadRequestException(AppError.WRONG_DATA);

    return this.userService.publicUser(dto.email);
  }
}
