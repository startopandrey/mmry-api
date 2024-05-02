import { Module } from '@nestjs/common';
import { MyCategoriesService } from './my-categories.service';
import { MyCategoriesController } from './my-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';
import { MemoriesService } from 'src/memories/memories.service';

@Module({
  controllers: [MyCategoriesController],
  providers: [MyCategoriesService, MemoriesService, AuthService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MyCategoriesModule {}
