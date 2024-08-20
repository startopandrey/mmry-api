import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class ActivitiesModule {}
