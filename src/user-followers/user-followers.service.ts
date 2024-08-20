import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateManualFollowerDto,
  CreateUserFollowerDto,
  UnFollowDto,
} from './dto/create-user-follower.dto';
import { UpdateUserFollowerDto } from './dto/update-user-follower.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { AuthServiceBase } from 'src/auth/auth.service';

@Injectable()
export class UserFollowersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly auth: AuthServiceBase,
  ) {}
  async follow({ userId: followedUserId }: CreateUserFollowerDto) {
    // Check if id is valid form
    if (!Types.ObjectId.isValid(followedUserId)) {
      throw new BadRequestException(`User ID is wrong`);
    }
    const currentUser = await this.auth.getCurrentUserOrThrow();
    const foundUser = await this.userModel.findById(followedUserId);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }
    if (currentUser._id.toString() === followedUserId) {
      throw new HttpException(
        'You cannot follow yourself',
        HttpStatus.CONFLICT,
      );
    }
    const checkIsFollowing = currentUser.followers.find(
      (e) => e.userId == followedUserId,
    );
    if (checkIsFollowing) {
      throw new HttpException(
        'You already follow this user',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
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
  async findOne(id: string) {
    return `This action returns a #${id} userFollower`;
  }

  update(id: number, updateUserFollowerDto: UpdateUserFollowerDto) {
    return `This action updates a #${id} userFollower`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFollower`;
  }
}
