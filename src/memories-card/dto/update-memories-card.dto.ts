import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssetsParam } from 'src/memories/dto/create-memory.dto';

export class UpdateMemoriesCardDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly id: string;
  @IsNumber()
  @ApiProperty()
  readonly activatedAt: number;
  @ApiProperty({ type: AssetsParam, isArray: true })
  readonly assets: AssetsParam[];
}
