import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ChangePasswordPayload } from '../payloads/changepassword.payload';
import { ChangeUsernamePayload } from '../payloads/changeusername.payload';
import { CreateAuthPayload } from '../payloads/createauth.payload';
import { LoginPayload } from '../payloads/login.payload';
import { SignupPayload } from '../payloads/signupayload';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post()
  async createAuth(@Body() body: CreateAuthPayload) {
    try {
      return await this.authservice.createauth(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
  @Patch('/:id')
  async changepassword(
    @Body() body: ChangePasswordPayload,
    @Param('id') id: number,
  ) {
    try {
      return await this.authservice.changepassword(body, id);
    } catch (error) {
      throw new HttpException('Error đổi password', 400);
    }
  }
  @Put('username/:id')
  async changeusername(
    @Body() body: ChangeUsernamePayload,
    @Param('id') id: number,
  ) {
    try {
      return await this.authservice.changeusername(body, id);
    } catch (error) {
      throw new HttpException('Error đổi username', 400);
    }
  }
  @Delete('delete/:id')
  async deleteauth(@Param('id') id: number) {
    try {
      return await this.authservice.deleteauth(id);
    } catch (error) {
      throw new HttpException('Lỗi xóa auth', 400);
    }
  }
  @Post('/login')
  async login(@Body() body: LoginPayload) {
    try {
      return await this.authservice.login(body);
    } catch (error) {}
  }
  @Post('/signup')
  async signup(@Body() body: SignupPayload) {
    try {
      return await this.authservice.signup(body);
    } catch (error) {}
  }
}
