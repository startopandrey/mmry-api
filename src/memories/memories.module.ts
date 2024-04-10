import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [MemoriesController],
  providers: [MemoriesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MemoriesModule {}
