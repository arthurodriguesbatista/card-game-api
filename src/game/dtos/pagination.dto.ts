import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt, TransformTake } from '../../utils/transformers';

export class PaginationDto<WHERE, ORDERBY, INCLUDE> {
  @ApiPropertyOptional()
  @IsOptional()
  @TransformInt()
  skip?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformTake()
  take?: number = 10;

  @ApiPropertyOptional({
    example: '{"nome":{"contains": "word"}}',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  where: WHERE;

  @ApiPropertyOptional({ example: '{"name": "asc"}', type: 'string' })
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  orderBy?: ORDERBY;

  @ApiPropertyOptional({ example: '{"relation": true}', type: 'string' })
  @IsOptional()
  include?: INCLUDE;
}
