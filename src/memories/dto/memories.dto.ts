import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class MemoriesMetaDto {
  @ApiProperty()
  readonly itemCount: number;
}
export class MemoriesDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => MemoriesMetaDto })
  readonly meta: MemoriesMetaDto;

  constructor(data: T[], meta: MemoriesMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
