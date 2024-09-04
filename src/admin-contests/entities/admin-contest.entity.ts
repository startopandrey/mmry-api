import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { ASSETS_TYPE } from 'src/memories/dto/create-memory.dto';

export type AdminContestDocument = AdminContest & Document;

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
  @Prop({ default: 0 })
  lat: mongoose.Schema.Types.Number;
  @Prop({ default: 0 })
  lng: mongoose.Schema.Types.Number;
}

export class Geometry {
  @Prop({ type: Coordinates })
  coordinates: Coordinates;
}

class LocationParams {
  @Prop()
  address: string;
  @Prop({ type: Geometry })
  geometry: Geometry;
}

@Schema()
class Duration {
  @Prop()
  from: Date;
  @Prop()
  to: Date;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class AdminContest {
  @Prop({ required: true })
  title: string;

  @Prop()
  note: string;

  @Prop()
  assets: AssetsParams[];

  @Prop({ type: LocationParams })
  location: LocationParams;

  @Prop()
  date: Date;

  @Prop({ type: Duration })
  duration: Duration;

  @Prop()
  isActive: boolean;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'AdminCategory' })
  categories: string[];

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'User' })
  contestants: string[];
}

export const AdminContestSchema = SchemaFactory.createForClass(AdminContest);
