import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleType } from 'src/modules/user/contants';
import { CreateUserPayload } from 'src/modules/user/payloads/createuser.payload';

export class SignupPayload extends CreateUserPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  password: string;
}
