import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

export class Category {
  @Prop()
  category: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
