import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserCategoryDocument = UserCategory & Document;

export class UserCategory {
  @Prop()
  category: string;
  @Prop() color: string;
}
export const UserCategorySchema = SchemaFactory.createForClass(UserCategory);
