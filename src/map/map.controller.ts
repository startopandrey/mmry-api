// src/mapbox/mapbox.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Map')
@ApiBearerAuth('JWT')
@Controller('api/v1/map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('geocode')
  async geocode(@Query('address') address: string): Promise<any> {
    return this.mapService.geocode(address);
  }
}
