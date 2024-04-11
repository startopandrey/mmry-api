import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ASSETS_TYPE } from '../dto/update-memories-card.dto';

export type MemoryCardDocument = MemoryCard & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class MemoryCard {
  @Prop()
  assets: {
    type: ASSETS_TYPE;
    fileName: string;
    uri: string;
    thumbnailUri: string;
  }[];
  @Prop()
  password: number;
  @Prop()
  authorClerkId: string;
  @Prop()
  updatedAt: number;
  @Prop()
  createdAt: number;
  @Prop()
  activatedAt: number;
}
export const MemoryCardSchema = SchemaFactory.createForClass(MemoryCard);
