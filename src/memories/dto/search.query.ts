import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginationQuery } from 'src/pagination/pagination-options.dto';

export class SearchQuery extends PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  keyword?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.toString().split(','))
  categories?: string[];
}
