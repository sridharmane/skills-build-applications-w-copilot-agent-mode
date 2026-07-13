import { Schema, model, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  mascot: string;
  city: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    mascot: { type: String, required: true },
    city: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = model<TeamDocument>('Team', teamSchema);
