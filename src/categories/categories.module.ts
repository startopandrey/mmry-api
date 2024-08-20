import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class CategoriesModule {}
