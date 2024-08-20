import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { ASSETS_TYPE } from 'src/memories/dto/create-memory.dto';

export type AdminCategoryDocument = AdminCategory & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class AssetsParams {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: ASSETS_TYPE })
  type: ASSETS_TYPE;

  @Prop()
  fileName: string;

  @Prop()
  uri: string;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class AdminCategory {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [AssetsParams], default: [] })
  assets: AssetsParams[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AdminActivity' }] })
  activities: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AdminContest' }] })
  contests: Types.ObjectId[];

  @Prop()
  isActive: boolean;

  @Prop()
  isSeparate: boolean;

  @Prop()
  isPopular: boolean;
  @Prop()
  color: string;
}

export const AdminCategorySchema = SchemaFactory.createForClass(AdminCategory);
