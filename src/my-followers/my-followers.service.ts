import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMyFollowerDto, UnFollowDto } from './dto/create-my-follower.dto';
import { UpdateMyFollowerDto } from './dto/update-my-follower.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { AuthServiceBase } from 'src/auth/auth.service';

@Injectable()
export class MyFollowersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthServiceBase,
  ) {}
  async follow({ userId: followedUserId }: CreateMyFollowerDto) {
    const currentUser = await this.getCurrentUserOrThrow();
    if (currentUser._id === followedUserId) {
      throw new BadRequestException('You cannot follow yourself');
    }
    const checkIsFollowing = currentUser.followers.find(
      (e) => e.userId == followedUserId,
    );
    if (checkIsFollowing) {
      return 'ALREADY';
    }
    const newFollower = { userId: followedUserId, since: Date.now() };
    currentUser.followers.push(newFollower);
    await currentUser.save();
    return 'SUCCESS';
  }
  async unFollow({ userId: unFollowedUserId }: UnFollowDto) {
    const currentUser = await this.getCurrentUserOrThrow();
    currentUser.followers = currentUser.followers.filter(
      (follower) => follower.userId != unFollowedUserId,
    );
    await currentUser.save();
    return 'SUCCESS';
  }

  private async getCurrentUserOrThrow(): Promise<any> {
    const currentUserId = this.auth.getCurrentUserId();

    const currentUser = await this.userModel.findById(currentUserId);
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return currentUser;
  }

  findAll() {
    return `This action returns all myFollowers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myFollower`;
  }

  update(id: number, updateMyFollowerDto: UpdateMyFollowerDto) {
    return `This action updates a #${id} myFollower`;
  }

  remove(id: number) {
    return `This action removes a #${id} myFollower`;
  }
}
