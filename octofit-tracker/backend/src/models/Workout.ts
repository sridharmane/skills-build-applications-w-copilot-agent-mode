import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focusArea: string;
  exercises: string[];
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    exercises: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
