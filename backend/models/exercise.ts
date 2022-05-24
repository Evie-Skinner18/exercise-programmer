import mongoose from "mongoose";

export interface IExercise {
    // might have to remove
    _id: string;
    name: string;
    focus: string;
    difficulty: number;
}

export const ExerciseSchema = new mongoose.Schema<IExercise>({
    _id!: { type: String, required: true },
    name!: { type: String, required: true },
    focus!: { type: String, required: true },
    difficulty!: { type: Number, required: true }
});

export const Exercise = mongoose.model('Exercise', ExerciseSchema);