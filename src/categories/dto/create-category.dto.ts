import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ASSETS_TYPE } from 'src/memories/dto/create-memory.dto';

export class AssetsParams {
  @ApiProperty({ type: String, enum: ASSETS_TYPE })
  type: ASSETS_TYPE;
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  uri: string;
  @ApiProperty()
  thumbnailUri: string;
}

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ type: AssetsParams, isArray: true })
  readonly assets: AssetsParams[];

  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty()
  isPopular: boolean;

  @IsNotEmpty()
  @ApiProperty()
  color: string;
}
