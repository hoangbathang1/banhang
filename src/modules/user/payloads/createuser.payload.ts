import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleType } from '../contants';

export class CreateUserPayload {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  email: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  firstname: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  lastname: string;
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ type: 'enum', default: RoleType.user })
  @IsOptional()
  @IsEnum(RoleType)
  roles: RoleType;
}
