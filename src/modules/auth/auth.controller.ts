import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../app/users/dto';
import { LoginUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtAutchGuards } from 'src/guards/jwtGuards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('Api')
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  registerUser(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.requestUser(dto);
  }
  @ApiTags('Api')
  @ApiResponse({ status: 200, type: LoginDto })
  @Post('login')
  loginUser(@Body() dto: LoginUserDto): Promise<LoginDto> {
    return this.authService.loginUser(dto);
  }
  @UseGuards(JwtAutchGuards)
  @Post('test')
  test() {
    return true;
  }
}
