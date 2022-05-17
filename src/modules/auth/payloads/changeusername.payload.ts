import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeUsernamePayload {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  usernameold: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  usernamenew: string;
}
