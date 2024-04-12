import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

class UserMetadata {
  @Prop()
  createdAt: number;
  @Prop()
  updatedAt: number;
}

class UserProfile {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  isVerified: boolean;
  @Prop()
  birthday: string;
  @Prop()
  profileImage: string;
}

class ManualFollowers {
  @Prop()
  name: string;
  @Prop()
  birthday: number;
  @Prop()
  address: string;
  @Prop()
  postcode: string;
}

class Follower {
  @Prop() userId: string;
  @Prop() since: number;
}

// base entity user class
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User {
  @Prop()
  clerkUserId: string;

  @Prop()
  username: string;

  @Prop()
  emailAddress: string;

  @Prop()
  metadata: UserMetadata;

  @Prop()
  memories: { memoryId: string }[];

  @Prop({
    type: [{ userId: { type: [SchemaTypes.ObjectId], ref: 'User' } }],
  })
  followers: Follower[];

  @Prop({
    type: [
      { name: String, birthday: String, address: String, postcode: String },
    ],
  })
  manualFollowers: ManualFollowers[];

  @Prop()
  profile: UserProfile;
}

export const UserSchema = SchemaFactory.createForClass(User);
