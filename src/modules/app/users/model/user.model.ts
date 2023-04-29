import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { WatchList } from 'src/modules/watch-list/watchList.model';
@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => WatchList, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  watchList: WatchList[];
}
