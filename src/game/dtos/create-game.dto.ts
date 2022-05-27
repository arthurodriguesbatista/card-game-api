import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDTO {
  @ApiProperty({ example: ['Arthur', 'Brian'] })
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  playersName: string[];

  @ApiProperty({ example: 'Just for fun' })
  @IsString()
  name: string;
}
