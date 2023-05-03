import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserController } from './user.controller';
import { TokenModule } from 'src/modules/token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
