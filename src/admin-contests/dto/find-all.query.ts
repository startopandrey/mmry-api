import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindAllQuery {
  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;
}
