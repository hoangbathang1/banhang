import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordPayload {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  newpassword: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  oldpassword: string;
}
