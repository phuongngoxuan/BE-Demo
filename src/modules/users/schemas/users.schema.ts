import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { UserRole } from 'src/shares/enums/user.enum';

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: String, unique: true, sparse: true })
  facebookId: string;

  @Prop({ type: String, unique: true, sparse: true })
  googleId: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({
    type: String,
    sparse: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, default: '', select: false })
  @Exclude()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ type: String, default: '' })
  img: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: Date })
  lastLoginAt: Date;

  @Prop({ required: false, type: Boolean, default: false })
  deleted?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
