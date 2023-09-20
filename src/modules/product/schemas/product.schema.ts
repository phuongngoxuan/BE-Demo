import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'products' })
export class Product {
  @Prop({ type: String })
  img: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  producer: string;

  @Prop({ required: false, type: MongooseSchema.Types.Decimal128, default: 0 })
  price?: number;

  @Prop({ type: Boolean, default: false })
  inStock: boolean;

  @Prop({ required: false, type: Boolean, default: false })
  deleted?: boolean;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
