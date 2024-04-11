import { Module } from '@nestjs/common';
import { MemoriesCardService } from './memories-card.service';
import { MemoriesCardController } from './memories-card.controller';
import forFeatureDb from 'src/db/for-feature.db';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MemoriesCardController],
  providers: [MemoriesCardService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class MemoriesCardModule {}
