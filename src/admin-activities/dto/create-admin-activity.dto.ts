import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
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

export class CreateAdminActivityDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsOptional()
  @ApiProperty({ type: AssetsParams, isArray: true })
  readonly assets: AssetsParams[];

  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  note: string;

  @IsOptional()
  @ApiProperty()
  location: LocationParams;

  @IsNotEmpty()
  @ApiProperty({ type: String, isArray: true })
  categories: string[];
}
