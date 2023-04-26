import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser } from './dto';
import { JwtAutchGuards } from 'src/guards/jwtGuards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAutchGuards)
  @Patch('update')
  updateUser(@Body() dto: UpdateUser, @Req() request): Promise<UpdateUser> {
    const data = request.user;

    return this.userService.updateUser(data.email, dto);
  }
  @UseGuards(JwtAutchGuards)
  @Delete('delete')
  geleteUser(@Req() request) {
    return this.userService.deleteUser(request.user.email);
  }
}
