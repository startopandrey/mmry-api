import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyFollowersService } from './my-followers.service';
import { CreateMyFollowerDto } from './dto/create-my-follower.dto';
import { UpdateMyFollowerDto } from './dto/update-my-follower.dto';

@Controller('my-followers')
export class MyFollowersController {
  constructor(private readonly myFollowersService: MyFollowersService) {}

  @Post()
  create(@Body() createMyFollowerDto: CreateMyFollowerDto) {
    return this.myFollowersService.create(createMyFollowerDto);
  }

  @Get()
  findAll() {
    return this.myFollowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myFollowersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyFollowerDto: UpdateMyFollowerDto) {
    return this.myFollowersService.update(+id, updateMyFollowerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myFollowersService.remove(+id);
  }
}
