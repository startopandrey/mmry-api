import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    getters: true,
    // virtuals: true,
  },
})
export class MyWish {
  @Prop()
  name: string;
}
