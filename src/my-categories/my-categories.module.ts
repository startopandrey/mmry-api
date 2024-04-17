import { Module } from '@nestjs/common';
import { MyCategoriesService } from './my-categories.service';
import { MyCategoriesController } from './my-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [MyCategoriesController],
  providers: [MyCategoriesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MyCategoriesModule {}
