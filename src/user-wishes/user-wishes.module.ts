import { Module } from '@nestjs/common';
import { UserWishesService } from './user-wishes.service';
import { UserWishesController } from './user-wishes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UserWishesController],
  providers: [UserWishesService, AuthService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class UserWishesModule {}
