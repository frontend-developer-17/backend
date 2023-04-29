import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUser } from './dto';
import { WatchList } from 'src/modules/watch-list/watchList.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
  ) {}

  async findUserEmail(email: string) {
    return this.UserRepository.findOne({
      where: { email },
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.UserRepository.create({
        firstName: dto.firstName,
        username: dto.username,
        password: dto.password,
        email: dto.email,
      });
      return this.publicUser(dto.email);
    } catch (err) {
      throw new Error(err);
    }
  }

  async publicUser(email: string) {
    return this.UserRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      include: { model: WatchList, required: false },
    });
  }

  async updateUser(email: string, dto: UpdateUser): Promise<UpdateUser> {
    try {
      await this.UserRepository.update(dto, { where: { email } });
      return dto;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      this.UserRepository.destroy({ where: { email } });
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
