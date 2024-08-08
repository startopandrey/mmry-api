// src/mapbox/mapbox.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapService {
  constructor() {}

  async geocode(address: string): Promise<any> {
    console.log(process.env.MAPBOX_ACCESS_TOKEN)
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_ACCESS_TOKEN,
        },
      },
    );
    return response.data;
  }

  // Additional methods to interact with Mapbox API can be added here
}
