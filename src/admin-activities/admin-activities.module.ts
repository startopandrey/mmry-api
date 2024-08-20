import { Module } from '@nestjs/common';
import { AdminActivitiesService } from './admin-activities.service';
import { AdminActivitiesController } from './admin-activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [AdminActivitiesController],
  providers: [AdminActivitiesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class AdminActivitiesModule {}
