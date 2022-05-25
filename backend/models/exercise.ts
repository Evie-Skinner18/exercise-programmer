import mongoose from "mongoose";

export interface IExercise {
    _id: string;
    name: string;
    focus: string;
    difficulty: number;
    dateAdded?: Date;
}

export const ExerciseSchema = new mongoose.Schema<IExercise>({
    _id!: { type: String, required: true },
    name!: { type: String, required: true },
    focus!: { type: String, required: true },
    difficulty!: { type: Number, required: true },
    dateAdded: { type: Date, required: false }
});

export const Exercise = mongoose.model('Exercise', ExerciseSchema);