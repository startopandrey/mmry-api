import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQuery } from 'src/pagination/pagination-options.dto';

export class SearchQuery extends PaginationQuery {
  @ApiPropertyOptional()
  @IsOptional()
  keyword?: string;
}
