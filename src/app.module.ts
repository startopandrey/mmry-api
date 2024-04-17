import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoriesModule } from './memories/memories.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthService } from './auth/auth.service';
import { MemoriesCardModule } from './memories-card/memories-card.module';
// import { MemoryCardSchema } from './memories-card/entities/memory-card.entity';
import { UsersModule } from './users/users.module';
import { MyFollowersModule } from './my-followers/my-followers.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { CategoriesModule } from './categories/categories.controller';
import { MyCategoriesModule } from './my-categories/my-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MyFollowersModule,
    CategoriesModule,
    MemoriesCardModule,
    UsersModule,
    MemoriesModule,
    WebhooksModule,
    MyCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
