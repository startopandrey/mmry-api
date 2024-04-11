import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
export type UserDocument = User & Document;
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
  username: { type: string; unique: true };
  @Prop()
  emailAddress: string;
  @Prop()
  metadata: {
    createdAt: number;
    updatedAt: number;
  };
  @Prop()
  memories: { memoryId: string }[];
  @Prop({
    type: [{ userId: { type: [SchemaTypes.ObjectId], ref: 'User' } }],
  })
  followers: { userId: string; since: number }[];
  @Prop()
  manualFollowers: {
    name: string;
    birthday: number;
    address: string;
    postcode: string;
  }[];
  @Prop()
  profile: {
    firstName: string;
    lastName: string;
    isVerified: boolean;
    birthday: string;
    profileImage: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
