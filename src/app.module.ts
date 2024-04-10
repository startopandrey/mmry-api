import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoriesModule } from './memories/memories.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MemorySchema } from './memories/entities/memory.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: 'Memory', schema: MemorySchema }]),
    MemoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
