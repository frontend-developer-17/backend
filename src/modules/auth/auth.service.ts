import { Injectable } from '@nestjs/common';
import { UserService } from '../app/users/user.service';
import { CreateUserDto } from '../app/users/dto';
import { BadRequestException } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { LoginUserDto } from './dto/index';
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
    const register = await this.userService.findUserEmail(dto.email);
    if (register) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDto): Promise<LoginDto> {
    const register = await this.userService.findUserEmail(dto.email);
    if (!register) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const password = bcrypt.compare(dto.password, register.password);
    if (!password) throw new BadRequestException(AppError.WRONG_DATA);
    const userToken = {
      name: register.firstName,
      email: register.email,
    };
    const token = await this.tokenService.generateJwtToken(userToken);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
