import {
  AuthService,
  AuthServiceBase,
  FakeAuthService,
} from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { MyFollowersService } from './my-followers.service';
import { MyFollowersController } from './my-followers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [MyFollowersController],
  providers: [
    MyFollowersService,
    {
      provide: AuthServiceBase,
      useClass: AuthService,
    },
  ],
})
export class MyFollowersModule {}
