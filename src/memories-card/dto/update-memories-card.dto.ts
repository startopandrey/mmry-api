import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { AssetsParam } from 'src/memories/dto/create-memory.dto';

export class UpdateMemoriesCardDto {
  @IsNumber()
  @ApiProperty()
  readonly activatedAt: number;
  @ApiProperty({ type: AssetsParam, isArray: true })
  readonly assets: AssetsParam[];
}
