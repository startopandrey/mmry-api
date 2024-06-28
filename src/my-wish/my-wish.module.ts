import { Module } from '@nestjs/common';
import { MyWishService } from './my-wish.service';
import { MyWishController } from './my-wish.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [MyWishController],
  providers: [MyWishService, AuthService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MyWishModule {}
