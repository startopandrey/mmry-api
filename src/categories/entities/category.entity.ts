import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { ASSETS_TYPE } from 'src/memories/dto/create-memory.dto';

export type CategoryDocument = Category & Document;

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
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [AssetsParams], default: [] })
  assets: AssetsParams[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Activity' }] })
  activities: Types.ObjectId[];

  @Prop()
  isActive: boolean;

  @Prop()
  isPopular: boolean;
  @Prop()
  color: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
