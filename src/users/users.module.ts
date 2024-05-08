import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { AuthService } from 'src/auth/auth.service';
import { MemoriesService } from 'src/memories/memories.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, MemoriesService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class UsersModule {}
