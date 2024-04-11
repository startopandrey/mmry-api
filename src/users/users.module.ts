import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class UsersModule {}
