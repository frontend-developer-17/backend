import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/app/users/model/user.model';
@Table
export class WatchList extends Model {
  @ForeignKey(() => User)
  user: User;

  @Column
  name: string;

  @Column
  assets: string;
}
