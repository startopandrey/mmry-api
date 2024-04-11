import { Injectable } from '@nestjs/common';
import { SearchQuery } from './dto/search.query';

@Injectable()
export class UsersService {
  async search(query: SearchQuery) {
    console.log(query);
    return query;
  }
}
