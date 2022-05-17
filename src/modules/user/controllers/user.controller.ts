import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CreateUserPayload } from '../payloads/createuser.payload';

import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() body: CreateUserPayload) {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
