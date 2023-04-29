import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../app/users/dto';
import { AuthLoginServise, LoginUserDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, LoginDto } from './dto/login.dto';
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
  @ApiResponse({ status: 200, type: AuthLoginDto })
  @Post('login')
  loginUser(@Body() dto: LoginUserDto): Promise<AuthLoginServise> {
    return this.authService.loginUser(dto);
  }
}
