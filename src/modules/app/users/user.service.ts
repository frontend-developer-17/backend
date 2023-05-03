import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUser } from './dto';
import { WatchList } from 'src/modules/watch-list/watchList.model';
import { TokenService } from 'src/modules/token/token.service';
import { AuthLoginDto } from 'src/modules/auth/dto/login.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly UserRepository: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async findUserEmail(email: string) {
    return this.UserRepository.findOne({
      where: { email },
    });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDto) {
    try {
      dto.password = await this.hashPassword(dto.password);
      await this.UserRepository.create({
        firstName: dto.firstName,
        username: dto.username,
        password: dto.password,
        email: dto.email,
      });

      //  return this.publicUser(dto.email);
    } catch (err) {
      throw new Error(err);
    }
  }

  async publicUser(email: string): Promise<AuthLoginDto> {
    const user = await this.UserRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      include: { model: WatchList, required: false },
    });

    const token = await this.tokenService.generateJwtToken(user);
    return { user, token };
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
