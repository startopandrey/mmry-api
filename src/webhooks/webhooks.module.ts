import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService],
  imports: [MongooseModule.forFeature(forFeatureDb)],
})
export class WebhooksModule {}
