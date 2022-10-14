import mongoose from "mongoose";
import ExerciseRandomiser from "../utils/exercise.randomiser";

export interface IExercise {
    _id: string;
    name: string;
    focus: string;
    category: Category;
    difficulty: number;
    dateAdded?: Date;
}

export enum Category {
    ANIMAL_MOVEMENTS = "animal movements",
    KETTLEBELL = "kettlebell",
    KARATE = "karate",
    KUNG_FU = "kung fu",
    CALISTHENICS = "calisthenics",
    PLYOMETRICS = "plyometrics",
    ISOMETRICS = "isometrics",
    STRETCHING = "stretching",
    WEIGHTLIFTING = "weightlifting",
    OTHER = "other"
}

export const ExerciseSchema = new mongoose.Schema<IExercise>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    focus: { type: String, required: true },
    category: {type: String, required: false, enum: Category, default: Category.OTHER},
    difficulty: { type: Number, required: true },
    dateAdded: { type: Date, required: false }
});

export const Exercise = mongoose.model('Exercise', ExerciseSchema);