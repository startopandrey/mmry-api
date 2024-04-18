import { Module } from '@nestjs/common';
import { MyCategoriesService } from './my-categories.service';
import { MyCategoriesController } from './my-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [MyCategoriesController],
  providers: [MyCategoriesService, AuthService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MyCategoriesModule {}
