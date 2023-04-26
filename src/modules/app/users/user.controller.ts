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
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAutchGuards)
  @ApiTags('Api')
  @ApiResponse({ status: 200, type: UpdateUser })
  @Patch('update')
  updateUser(@Body() dto: UpdateUser, @Req() request): Promise<UpdateUser> {
    const data = request.user;

    return this.userService.updateUser(data.email, dto);
  }
  @UseGuards(JwtAutchGuards)
  @ApiTags('Api')
  @ApiResponse({ status: 200 })
  @ApiProperty()
  @Delete('delete')
  geleteUser(@Req() request): Promise<boolean> {
    return this.userService.deleteUser(request.user.email);
  }
}
