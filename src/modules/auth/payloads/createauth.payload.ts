import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthPayload {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  password: string;
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  userId: number;
  constructor(password: string, userId: number) {
    this.password = password;
    this.userId = userId;
  }
}
