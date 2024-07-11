import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { ASSETS_TYPE } from '../dto/create-memory.dto';

export type MemoryDocument = Memory & Document;

export class MemoryAssetsParams {
  @Prop({ type: String, enum: ASSETS_TYPE })
  type: ASSETS_TYPE;
  @Prop()
  fileName: string;
  @Prop()
  uri: string;
  @Prop()
  thumbnailUri: string;
}
class LocationParams {
  @Prop()
  address: string;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Memory {
  // toObject(): any {
  //   throw new Error('Method not implemented.');
  // }
  // @Prop()
  // _id: string;

  // @Prop()
  // id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  assets: {
    type: ASSETS_TYPE;
    fileName: string;
    uri: string;
    thumbnailUri: string;
  }[];

  @Prop()
  date: string;

  @Prop()
  location: LocationParams;

  @Prop()
  authorClerkId: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  mentioned: string[];

  @Prop()
  mentionedManually: string[];

  @Prop()
  note: string;
  @Prop({ type: [SchemaTypes.ObjectId] })
  categories: string[];
}

export const MemorySchema = SchemaFactory.createForClass(Memory);
