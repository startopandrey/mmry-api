import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyFollowersService } from './my-followers.service';
import {
  CreateManualFollowerDto,
  CreateMyFollowerDto,
  RemoveManualFollowerDto,
  UnFollowDto,
} from './dto/create-my-follower.dto';
import { UpdateMyFollowerDto } from './dto/update-my-follower.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@ApiTags('My Followers')
@ApiBearerAuth('JWT')
@Controller('api/v1/my-followers')
export class MyFollowersController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly myFollowersService: MyFollowersService,
  ) {}

  @Post('follow')
  follow(@Body() dto: CreateMyFollowerDto) {
    return this.myFollowersService.follow(dto);
  }
  @Post('unfollow')
  unFollow(@Body() dto: UnFollowDto) {
    return this.myFollowersService.unFollow(dto);
  }

  @Post('follow/manual-follower')
  followManualFollower(@Body() dto: CreateManualFollowerDto) {
    return this.myFollowersService.createManualFollower(dto);
  }
  @Post('unfollow/manual-follower')
  removeManualFollower(@Body() dto: RemoveManualFollowerDto) {
    return this.myFollowersService.removeManualFollower(dto);
  }
  @Get('manual-followers')
  getManualFollowers() {
    return this.myFollowersService.getManualFollowers();
  }
  @Get()
  findAll() {
    return this.myFollowersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.myFollowersService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMyFollowerDto: UpdateMyFollowerDto,
  ) {
    return this.myFollowersService.update(+id, updateMyFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myFollowersService.remove(+id);
  }
}
