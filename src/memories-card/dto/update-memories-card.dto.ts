import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export enum ASSETS_TYPE {
  IMAGE,
  VIDEO,
}
export class AssetsParam {
  @ApiProperty({ enum: ASSETS_TYPE })
  @IsEnum(ASSETS_TYPE, { each: true })
  type: ASSETS_TYPE;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsNotEmpty()
  uri: string;

  @ApiProperty()
  thumbnailUri: string;
}
export class UpdateMemoriesCardDto {
  @IsNumber()
  @ApiProperty()
  readonly activatedAt: number;
  @IsNumber()
  @ApiProperty()
  readonly updatedAt: number;
  @ApiProperty({ type: AssetsParam, isArray: true })
  readonly assets: AssetsParam[];
}
