import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { ASSETS_TYPE } from 'src/memories/dto/create-memory.dto';

export type ActivityDocument = AdminActivity & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class AssetsParams {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: ASSETS_TYPE })
  type: ASSETS_TYPE;

  @Prop()
  fileName: string;

  @Prop()
  uri: string;
}

export class Coordinates {
  @Prop()
  lat: number;
  @Prop()
  lng: number;
}

@Schema()
export class Geometry {
  coordinates: Coordinates;
}

@Schema()
class LocationParams {
  @Prop()
  address: string;
  @Prop()
  geometry: Geometry;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class AdminActivity {
  @Prop({ required: true })
  title: string;

  @Prop()
  note: string;

  @Prop()
  assets: AssetsParams[];

  @Prop({ type: LocationParams })
  location: LocationParams;

  @Prop()
  date: number;

  @Prop()
  isActive: boolean;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'AdminCategory' })
  categories: string[];
}

export const AdminActivitySchema = SchemaFactory.createForClass(AdminActivity);
