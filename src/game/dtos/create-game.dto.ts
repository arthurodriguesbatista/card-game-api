import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDTO {
  @ApiProperty({ example: 'Arthur' })
  @IsString()
  @IsNotEmpty()
  playerName: string;

  @ApiProperty({ example: 'Just for fun' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
