import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { MemoryAssetsParams } from 'src/memories/entities/memory.entity';

export type MemoryCardDocument = MemoryCard & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class MemoryCard {
  @Prop()
  assets: MemoryAssetsParams[];
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
