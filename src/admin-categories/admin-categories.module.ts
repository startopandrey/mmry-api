import { Module } from '@nestjs/common';
import { AdminCategoriesService } from './admin-categories.service';
import { AdminCategoriesController } from './admin-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [AdminCategoriesController],
  providers: [AdminCategoriesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class AdminCategoriesModule {}
