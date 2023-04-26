import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUser } from './dto';
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
    dto.password = await this.hashPassword(dto.password);
    await this.UserRepository.create({
      firstName: dto.firstName,
      username: dto.username,
      password: dto.password,
      email: dto.email,
    });
    return this.publicUser(dto.email);
  }

  async publicUser(email: string) {
    return this.UserRepository.findOne({
      where: { email },
      attributes: { exclude: ['password'] },
    });
  }

  async updateUser(email: string, dto: UpdateUser):Promise<UpdateUser> {
    await this.UserRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(email: string):Promise<boolean> {
    this.UserRepository.destroy({ where: { email } });
    return true;
  }
}
