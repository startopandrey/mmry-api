import { Module } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { MemoriesController } from './memories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [MemoriesController],
  providers: [MemoriesService, AuthService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MemoriesModule {}
