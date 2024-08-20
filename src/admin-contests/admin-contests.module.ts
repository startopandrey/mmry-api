import { Module } from '@nestjs/common';
import { AdminContestsService } from './admin-contests.service';
import { AdminContestsController } from './admin-contests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [AdminContestsController],
  providers: [AdminContestsService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class AdminContestsModule {}
