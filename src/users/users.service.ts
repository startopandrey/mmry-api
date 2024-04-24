import { Injectable } from '@nestjs/common';
import { SearchQuery } from './dto/search.query';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { PageMetaDto } from 'src/pagination/pagination-meta.dto';
import { PageDto } from 'src/pagination/pagination.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthService,
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
      clerkUserId: u.clerkUserId,
      username: u.username,
      firstName: u.profile.firstName,
      lastName: u.profile.lastName ?? '',
    }));
    return new PageDto(usersDtos, pageMetaDto);
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    const transformedUser = {
      id: user?._id.toString(),
      emailAddress: user.emailAddress,
      clerkUserId: user?.clerkUserId,
      username: user?.username,
      firstName: user?.profile.firstName,
      lastName: user?.profile.lastName ?? '',
      memoriesCount: user.memories.length,
      joinedAt: user.metadata.createdAt
    };
    return transformedUser;
  }
}
