import { AuthService, AuthServiceBase } from '../auth/auth.service';
import { Module } from '@nestjs/common';
import { UserFollowersService } from './user-followers.service';
import { UserFollowersController } from './user-followers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [UserFollowersController],
  providers: [
    UserFollowersService,
    {
      provide: AuthServiceBase,
      useClass: AuthService,
    },
  ],
})
export class UserFollowersModule {}
