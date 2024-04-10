import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MemoryDocument = Memory & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Memory {
  @Prop({ required: true })
  name: string;
  // @Prop()
  // assets: [
  //   {
  //     type: { type: string; enum: ['image', 'video'] };
  //     fileName: string;
  //     uri: string;
  //     thumbnailUri: string;
  //   },
  // ];
  @Prop()
  date: string;
  // @Prop()
  // location: {
  //   address: string;
  // };
  @Prop()
  password: number;
  @Prop()
  authorClerkId: string;
  // @Prop()
  // mentioned: [
  //   {
  //     clerkUserId: string;
  //     name: string;
  //     birthday: string;
  //     postcode: string;
  //     address: string;
  //   },
  // ];
  @Prop()
  note: string;
  // @Prop()
  // categories: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId;
  //     ref: 'Category';
  //   },
  // ];
}
export const MemorySchema = SchemaFactory.createForClass(Memory);
