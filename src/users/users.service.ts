import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SearchQuery } from './dto/search.query';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { PageMetaDto } from 'src/pagination/pagination-meta.dto';
import { PageDto } from 'src/pagination/pagination.dto';
import { AuthService } from 'src/auth/auth.service';
import { Memory, MemoryDocument } from 'src/memories/entities/memory.entity';
import { clerkClient } from '@clerk/clerk-sdk-node';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthService,
    @InjectModel(Memory.name)
    private readonly memoryModel: Model<MemoryDocument>,
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
    console.log({ foundUsers });
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: query });
    const usersDtos = foundUsers.map((u) => ({
      id: u._id.toString(),
      clerkUserId: u.clerkUserId,
      profileImage: u.profile?.profileImage ?? '',
      username: u.username,
      firstName: u.profile.firstName,
      lastName: u.profile.lastName ?? '',
    }));
    return new PageDto(usersDtos, pageMetaDto);
  }
  async findOne(id: string) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }
    const mentionedMemoriesCount = await this.memoryModel
      .find({ mentioned: { $in: id } })
      .countDocuments();
    const profileImage = !user?.profile?.profileImage.includes(
      'https://img.clerk.com',
    )
      ? user?.profile?.profileImage
      : '';

    const isMyAccount = currentUser._id.toString() == user?._id.toString();
    const isFollower =
      isMyAccount ||
      currentUser.followers.filter(
        (follower) => follower.userId?.toString() == user?._id?.toString(),
      ).length;
    const transformedUser = {
      isMyAccount: isMyAccount,
      isFollower: !!isFollower,
      id: user?._id.toString(),
      emailAddress: user.emailAddress,
      clerkUserId: user?.clerkUserId,
      profileImage: profileImage,
      username: user?.username,
      firstName: user?.profile.firstName,
      lastName: user?.profile.lastName ?? '',
      memoriesCount: user.memories.length,
      joinedAt: user.metadata.createdAt,
      mentionedMemoriesCount,
    };
    return transformedUser;
  }
  async delete(id: string) {
    await this.userModel.deleteOne({ clerkUserId: id });
    await clerkClient.users.deleteUser(id);
    return 'User deleted';
  }
}
