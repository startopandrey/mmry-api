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
import { CreateMyFollowerDto, UnFollowDto } from './dto/create-my-follower.dto';
import { UpdateMyFollowerDto } from './dto/update-my-follower.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('My Followers')
@Controller('api/my-followers')
export class MyFollowersController {
  constructor(private readonly myFollowersService: MyFollowersService) {}

  @Post('follow')
  follow(@Body() dto: CreateMyFollowerDto) {
    return '';
    // return this.myFollowersService.create(createMyFollowerDto);
  }
  @Post('unfollow')
  unFollow(@Body() dto: UnFollowDto) {
    return '';
    // return this.myFollowersService.create(createMyFollowerDto);
  }

  @Post('manual-follower')
  createManualFollower(@Body() dto: CreateMyFollowerDto) {
    return '';
    // return this.myFollowersService.create(createMyFollowerDto);
  }
  @Get('manual-followers')
  getManualFollowers() {
    return [];
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
