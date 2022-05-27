import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @ApiProperty({ example: 'Arthur' })
  @IsString()
  @IsNotEmpty()
  playerName: string;
}
