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
import { UserFollowersModule } from './user-followers/user-followers.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { MyCategoriesModule } from './my-categories/my-categories.module';
import { MapModule } from './map/map.module';
import { AdminCategoriesModule } from './admin-categories/admin-categories.module';
import { AdminActivitiesModule } from './admin-activities/admin-activities.module';
import { AdminContestsModule } from './admin-contests/admin-contests.module';
import { UserWishesModule } from './user-wishes/user-wishes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UserFollowersModule,
    AdminCategoriesModule,
    MemoriesCardModule,
    UsersModule,
    MemoriesModule,
    WebhooksModule,
    MyCategoriesModule,
    UserWishesModule,
    MapModule,
    AdminActivitiesModule,
    AdminContestsModule,
    UserWishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
