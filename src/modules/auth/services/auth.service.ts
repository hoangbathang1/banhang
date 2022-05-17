import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthPayload } from '../payloads/createauth.payload';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordPayload } from '../payloads/changepassword.payload';
import { ChangeUsernamePayload } from '../payloads/changeusername.payload';
import { LoginPayload } from '../payloads/login.payload';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { AuthDto } from '../dtos/auth.dto';
import { ConfigService } from '@nestjs/config';
import { SignupPayload } from '../payloads/signupayload';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string) {
    try {
      if (password) {
        return await bcrypt.hashSync(password, 10);
      }
    } catch (error) {
      throw new HttpException('error password', 400);
    }
  }
  async verifyPassword(passwordHash: string, password: string) {
    const valid = await bcrypt.compare(password, passwordHash);
    if (!valid) {
      throw new HttpException('sai password', 400);
    }
  }
  async createauth(payload: CreateAuthPayload) {
    try {
      const user = await this.userService.finduserbyid(payload.userId);
      if (!user) {
        throw new HttpException('ERROR CREATE USER', 400);
      }
      const validauth = await this.authRepository.findOne({
        id: payload.userId,
      });
      if (validauth) {
        throw new HttpException('Đã tồn tại UserID', 400);
      }
      payload.password = await this.hashPassword(payload.password);
      const newauth = this.authRepository.create(payload);
      newauth.user = user;
      return this.authRepository.save(newauth);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  async changepassword(payload: ChangePasswordPayload, authid: number) {
    try {
      const auth = await this.authRepository.findOne({
        id: authid,
      });
      if (!auth) {
        throw new HttpException('Erorr change password', 400);
      }
      await this.verifyPassword(auth.password, payload.oldpassword);
      auth.password = await this.hashPassword(payload.newpassword);
      return this.authRepository.save(auth);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  async changeusername(payload: ChangeUsernamePayload, userid: number) {
    try {
      const query = this.authRepository
        .createQueryBuilder('auth')
        .leftJoinAndSelect('auth.user', 'user');
      query.where('auth.id = :userid and username = :username', {
        userid,
        username: payload.usernameold,
      });
      const auth = await query.getOne();
      const { user } = auth;
      if (user.username != payload.usernameold) {
        throw new HttpException('Sai username', 400);
      }
      if (payload.usernamenew) {
        user.username = payload.usernamenew;
      }
      return await this.userService.saveuser(user);
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }
  async deleteauth(id: number) {
    try {
      const auth = await this.authRepository.findOne({
        id,
      });
      if (!auth) {
        throw new HttpException('Sai id', 400);
      }
      return await this.authRepository.remove(auth);
    } catch (error) {}
  }
  async login(payload: LoginPayload) {
    // console.log(auth);
    // if (!auth) {
    //   throw new HttpException('Sai username', 400);
    // }
    const user = await this.userRepository.findOne({
      username: payload.username,
    });
    if (!user) {
      throw new HttpException('Sai username', 400);
    }
    const auth = await this.authRepository
      .createQueryBuilder('auth')
      .leftJoinAndSelect('auth.user', 'user')
      .where(' user.id =:id', {
        id: user.id,
      })
      .getOne();
    await this.verifyPassword(auth.password, payload.password);
    const authdto = new AuthDto(
      auth.user.id,
      auth.id,
      auth.user.email,
      auth.user.username,
    );
    const token = this.generateJWT(authdto);
    return { token };
  }
  generateJWT(auth: AuthDto, options: SignOptions = {}) {
    const newOptions: SignOptions = {
      expiresIn: 60 * 60 * 24 * 7,
      ...(options || {}),
    };
    return sign(
      {
        userId: auth.userId,
        username: auth.username,
        email: auth.email,
        authId: auth.authId,
      },
      this.configService.get('jwtSecrect'),
      newOptions,
    );
  }
  async signup(payload: SignupPayload) {
    const user = await this.userService.createUser(payload);
    const payloadauth = new CreateAuthPayload(payload.password, user.id);
    return await this.createauth(payloadauth);
  }
  verifyJWT(token: string) {
    return verify(token, this.configService.get('jwtSecrect'));
  }
  async getAuthfromJwt(jwtToken: string) {
    const decodded = this.verifyJWT(jwtToken) as {
      userId: number;
      username: string;
      email: string;
      authId: number;
    };
    if (!decodded) {
      throw new HttpException('lỗi convert', 400);
    }
    const auth = await this.authRepository
      .createQueryBuilder('auth')
      .leftJoinAndSelect('auth.user', 'user')
      .where(' user.id =:id', {
        id: decodded.userId,
      })
      .getOne();
    return auth;
  }
}
