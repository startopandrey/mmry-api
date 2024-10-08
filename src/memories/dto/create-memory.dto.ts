import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum ASSETS_TYPE {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class AssetsParam {
  @IsEnum(ASSETS_TYPE, { each: true })
  @ApiProperty({ enum: ASSETS_TYPE })
  type: ASSETS_TYPE;

  @IsString()
  @ApiProperty()
  fileName: string;

  @IsNotEmpty()
  @ApiProperty()
  uri: string;

  @ApiProperty()
  thumbnailUri: string;
}
class LocationParam {
  @ApiProperty()
  address: string;
  @ApiProperty()
  coordinates: {
    lat: number;
    lng: number;
  };
}

class MentionedManually {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  postcode: string;
  @ApiProperty()
  address: string;
}
export class CreateMemoryDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty({ type: AssetsParam, isArray: true })
  readonly assets: AssetsParam[];

  @IsNumber()
  @ApiProperty()
  date: number;

  @ApiProperty()
  location: LocationParam;

  @ApiProperty()
  @IsNotEmpty()
  authorClerkId: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  mentioned: string[];

  @ApiProperty({ type: MentionedManually, isArray: true })
  mentionedManually: MentionedManually[];

  @ApiProperty()
  note: string;

  @ApiProperty()
  categories: string[];
}
