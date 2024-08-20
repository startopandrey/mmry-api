import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserFollowersService } from './user-followers.service';
import {
  CreateManualFollowerDto,
  CreateUserFollowerDto,
  RemoveManualFollowerDto,
  UnFollowDto,
} from './dto/create-user-follower.dto';
import { UpdateUserFollowerDto } from './dto/update-user-follower.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@ApiTags('User Followers')
@ApiBearerAuth('JWT')
@Controller('api/v1/my-followers')
export class UserFollowersController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userFollowersService: UserFollowersService,
  ) {}

  @Post('follow')
  follow(@Body() dto: CreateUserFollowerDto) {
    return this.userFollowersService.follow(dto);
  }
  @Post('unfollow')
  unFollow(@Body() dto: UnFollowDto) {
    return this.userFollowersService.unFollow(dto);
  }

  @Post('follow/manual-follower')
  followManualFollower(@Body() dto: CreateManualFollowerDto) {
    return this.userFollowersService.createManualFollower(dto);
  }
  @Post('unfollow/manual-follower')
  removeManualFollower(@Body() dto: RemoveManualFollowerDto) {
    return this.userFollowersService.removeManualFollower(dto);
  }
  @Get('manual-followers')
  getManualFollowers() {
    return this.userFollowersService.getManualFollowers();
  }
  @Get()
  findAll() {
    return this.userFollowersService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserFollowerDto: UpdateUserFollowerDto,
  ) {
    return this.userFollowersService.update(+id, updateUserFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFollowersService.remove(+id);
  }
}
