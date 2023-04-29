import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { JwtAutchGuards } from 'src/guards/jwtGuards';
import { CreateWatchList, WatchListDto } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}
  @UseGuards(JwtAutchGuards)
  @ApiTags('Api')
  @ApiResponse({ status: 200, type: CreateWatchList })
  @Post('create')
  createWatchList(
    @Body() dto: WatchListDto,
    @Req() register,
  ): Promise<CreateWatchList> {
    const user = register.user;
    return this.watchListService.createWatchList(user, dto);
  }
  @UseGuards(JwtAutchGuards)
  @ApiTags('Api')
  @ApiResponse({ status: 200 })
  @Delete('delete')
  updateWatchList(
    @Query('id') assetsId: number,
    @Req() register,
  ): Promise<boolean> {
    const { id } = register.user;
    return this.watchListService.deleteWatchList(id, assetsId);
  }
}
