import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterQuery {
  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((string) => Boolean(string.value === 'true'))
  isActive?: boolean;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((string) => Boolean(string.value === 'true'))
  isSeparate?: boolean;

  @IsBoolean()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((string) => Boolean(string.value === 'true'))
  isPopular?: boolean;
}
