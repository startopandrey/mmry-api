import { Module } from '@nestjs/common';
import { MyFollowersService } from './my-followers.service';
import { MyFollowersController } from './my-followers.controller';

@Module({
  controllers: [MyFollowersController],
  providers: [MyFollowersService],
})
export class MyFollowersModule {}
