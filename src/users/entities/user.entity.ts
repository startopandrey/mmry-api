import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {  SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & mongoose.Document;

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

@Schema()
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
@Schema()
class Follower {
  @Prop() userId: string;
  @Prop() since: number;
}

@Schema()
class Category {
  @Prop()
  category: string;
}

@Schema()
class Wish {
  @Prop({ type: Types.ObjectId })
  wish: Types.ObjectId;
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

  @Prop([{ memoryId: { type: [SchemaTypes.ObjectId], ref: 'Memory' } }])
  memories: { memoryId: string }[];

  @Prop({
    type: [{ userId: { type: [SchemaTypes.ObjectId], ref: 'User' } }],
  })
  followers: Follower[];

  @Prop({ type: [Category] })
  categories: Category[];

  @Prop({ type: [{ wish: { type: SchemaTypes.ObjectId, ref: 'UserWish' } }] })
  wishes: Wish[];

  @Prop({
    type: [
      {
        name: String,
        birthday: Number,
        address: String,
        postcode: String,
      },
    ],
  })
  manualFollowers: ManualFollowers[];

  @Prop()
  profile: UserProfile;
}
export const UserSchema = SchemaFactory.createForClass(User);
