import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = Category & Document;

export class Category {
  @Prop()
  category: string;
  @Prop() color: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
