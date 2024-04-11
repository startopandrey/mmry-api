import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoriesModule } from './memories/memories.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MemorySchema } from './memories/entities/memory.entity';
// import { AuthService } from './auth/auth.service';
import { MemoriesCardModule } from './memories-card/memories-card.module';
import { MemoryCardSchema } from './memories-card/entities/memory-card.entity';
import { UsersModule } from './users/users.module';
import { MyFollowersModule } from './my-followers/my-followers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([
      { name: 'Memory', schema: MemorySchema },
      { name: 'MemoryCard', schema: MemoryCardSchema },
    ]),
    MemoriesModule,
    MemoriesCardModule,
    UsersModule,
    MyFollowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
