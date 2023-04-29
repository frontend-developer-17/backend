import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './watchList.model';
import { CreateUserDto } from '../app/users/dto';
import { CreateWatchList, WatchListDto } from './dto';
import { TokenDto } from '../token/dto';

@Injectable()
export class WatchListService {
  constructor(
    @InjectModel(WatchList)
    private readonly watchListPepositori: typeof WatchList,
  ) {}

  async createWatchList(
    user: TokenDto,
    dto: WatchListDto,
  ): Promise<CreateWatchList> {
    try {
      const watchList = {
        user: user.id,
        name: dto.name,
        assets: dto.assets,
      };
      await this.watchListPepositori.create(watchList);
      return watchList;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteWatchList(id: number, assetsId: number): Promise<boolean> {
    try {
      await this.watchListPepositori.destroy({
        where: { user: id, id: assetsId },
      });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
