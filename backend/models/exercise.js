import mongoose from "mongoose";

export const ExerciseSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    focus: String,
    difficulty: Number
});

export const Exercise = mongoose.model('Exercise', ExerciseSchema);