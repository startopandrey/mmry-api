import { Injectable } from '@nestjs/common';
import { SearchQuery } from './dto/search.query';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { PageMetaDto } from 'src/pagination/pagination-meta.dto';
import { PageDto } from 'src/pagination/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async search(query: SearchQuery) {
    const findQuery = query.keyword
      ? {
          username: { $regex: query.keyword, $options: 'i' },
        }
      : {};
    const itemCount = await this.userModel.find(findQuery).countDocuments();
    const foundUsers = await this.userModel
      .find(findQuery)
      .sort({ date: query.order })
      .limit(query.take)
      .skip(query.skip);
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    const usersDtos = foundUsers.map((u) => ({
      id: u._id.toString(),
      username: u.username,
      firstName: u.profile.firstName,
      lastName: u.profile.lastName ?? '',
    }));
    return new PageDto(usersDtos, pageMetaDto);
  }
}
