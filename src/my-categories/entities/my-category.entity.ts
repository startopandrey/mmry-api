import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserCategoryDocument = UserCategory & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class UserCategory {
  @Prop()
  category: string;
}
export const UserCategorySchema = SchemaFactory.createForClass(UserCategory);
