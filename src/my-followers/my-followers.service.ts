import { Injectable } from '@nestjs/common';
import { CreateMyFollowerDto } from './dto/create-my-follower.dto';
import { UpdateMyFollowerDto } from './dto/update-my-follower.dto';

@Injectable()
export class MyFollowersService {
  create(createMyFollowerDto: CreateMyFollowerDto) {
    return 'This action adds a new myFollower';
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
