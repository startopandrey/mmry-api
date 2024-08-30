import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { WISH_TYPE } from '../dto/wish.dto';

export type UserWishDocument = UserWish & Document;

@Schema()
export class Data {
  title: string;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class UserWish {
  @Prop()
  data: Data;

  @Prop({ type: String, enum: WISH_TYPE, default: WISH_TYPE.MANUAL })
  type: WISH_TYPE;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'AdminActivity' })
  releatedActivity: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'AdminContest' })
  releatedContest: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  author: Types.ObjectId;
}

export const UserWishSchema = SchemaFactory.createForClass(UserWish);
