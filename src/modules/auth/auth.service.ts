import { Injectable } from '@nestjs/common';
import { UserService } from '../app/users/user.service';
import { CreateUserDto } from '../app/users/dto';
import { BadRequestException } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { AuthLoginServise, LoginUserDto } from './dto/index';
import * as bcrypt from 'bcrypt';
import { TokenService } from './../token/token.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async requestUser(dto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const register = await this.userService.findUserEmail(dto.email);
      if (register) throw new BadRequestException(AppError.USER_EXIST);
      return this.userService.createUser(dto);
    } catch (err) {
      throw new Error(err);
    }
  }

  async loginUser(dto: LoginUserDto): Promise<AuthLoginServise> {
    const register = await this.userService.findUserEmail(dto.email);
    if (!register) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const password = bcrypt.compare(dto.password, register.password);
    if (!password) throw new BadRequestException(AppError.WRONG_DATA);
    const user = await this.userService.publicUser(dto.email);

    const token = await this.tokenService.generateJwtToken(user);
    return { user, token };
  }
}
