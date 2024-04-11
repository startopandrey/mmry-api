import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

export class Category {
  @Prop({ type: { type: String, required: true, unique: true } })
  category: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
