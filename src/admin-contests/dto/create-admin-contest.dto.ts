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
}
export class Coordinates {
  @ApiProperty()
  lat: number;
  @ApiProperty()
  lng: number;
}

class LocationParams {
  @ApiProperty()
  address: string;

  @ApiProperty()
  coordinates: Coordinates;
}

class Duration {
  @ApiProperty()
  from: number;

  @ApiProperty()
  to: number;
}

export class CreateAdminContestDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: AssetsParams, isArray: true })
  readonly assets: AssetsParams[];

  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty()
  date: number;

  @IsNotEmpty()
  @ApiProperty()
  note: string;

  @IsNotEmpty()
  @ApiProperty()
  location: LocationParams;

  @IsNotEmpty()
  @ApiProperty()
  duration: Duration;

  @IsNotEmpty()
  @ApiProperty({ type: String, isArray: true })
  categories: string[];
}
