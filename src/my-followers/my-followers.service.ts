import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateManualFollowerDto,
  CreateMyFollowerDto,
  UnFollowDto,
} from './dto/create-my-follower.dto';
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
    const currentUser = await this.auth.getCurrentUserOrThrow();
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
    const currentUser = await this.auth.getCurrentUserOrThrow();
    currentUser.followers = currentUser.followers.filter(
      (follower) => follower.userId != unFollowedUserId,
    );
    await currentUser.save();
    console.log(currentUser, unFollowedUserId);
    return 'SUCCESS';
  }

  async createManualFollower(dto: CreateManualFollowerDto) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const newManualFollower = dto;

    currentUser.manualFollowers.push(newManualFollower);
    await currentUser.save();
    return currentUser;
  }
  async removeManualFollower({ userId: unFollowedUserId }) {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    currentUser.manualFollowers = currentUser.manualFollowers.filter(
      (follower) => follower._id != unFollowedUserId,
    );
    await currentUser.save();
    return 'SUCCESS';
  }
  async getManualFollowers() {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const manualFollowers = currentUser.manualFollowers;
    return manualFollowers;
  }
  async findAll() {
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const userFollowedIds = currentUser?.followers.map((e) => e.userId);
    const followedUsers = await this.userModel.find({
      _id: { $in: userFollowedIds },
    });
    return followedUsers;
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
