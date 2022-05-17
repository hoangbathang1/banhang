import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../payloads/createuser.payload';
import { UpdateUserPayload } from '../payloads/updateuser.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser(payload: CreateUserPayload) {
    try {
      const user = await this.userRepository.findOne({ email: payload.email });
      if (user) {
        throw new HttpException('Đã tồn tại tên đăng nhập hoặc email', 400);
      }
      const newUser = this.userRepository.create(payload);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  async updateUser(payload: UpdateUserPayload, UserId: number) {
    try {
      const User = await this.userRepository.findOne(UserId);
      if (!User) {
        throw new HttpException('Không tồn tại Account', 400);
      }
      Object.assign(User, payload);
      return await this.userRepository.save(User);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  async deleteUser(UserId: number) {
    try {
      const User = await this.userRepository.findOne({ id: UserId });
      if (!User) {
        throw new HttpException('Không tồn tại User', 400);
      }
      return await this.userRepository.remove(User);
    } catch (error) {}
  }
  async finduserbyid(id: number) {
    try {
      return await this.userRepository.findOne({ id });
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  async saveuser(user: UserEntity) {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
