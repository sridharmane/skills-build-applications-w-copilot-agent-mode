import { Schema, model, Types } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  age: number;
  role: string;
  team?: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    role: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = model<UserDocument>('User', userSchema);
