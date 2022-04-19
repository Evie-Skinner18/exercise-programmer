import { Exercise } from "../../models/exercise.js";
import ExerciseRandomiser from "../../utils/exercise.randomiser.js";
import mongoose from "mongoose";

// load the exercises collection into memory once
export default class ExercisesProvider {

    static async searchExercises({
        filters = null,
        pageNumber = 0,
        exercisesPerPage = 0
    } = {}) {

        let exercises = [];

        try {
            let query

            if (filters) {
                if ("name" in filters) {
                    query = { $text: { $search: filters["name"] } }
                } else if ("difficulty" in filters) {
                    query = { "difficulty": { $eq: filters["difficulty"] } }
                } else if ("focus" in filters) {
                    query = { "focus": { $eq: filters["focus"] } }
                }
            }
            exercises = await Exercise.find(query)
                .limit(exercisesPerPage)
                .skip(exercisesPerPage * pageNumber);
        } catch (error) {
            console.error(`Unable to find exercises. Error:${error}`);
            return exercises;
        }

        return exercises;
    }

    static async getRandomExercise() {
        let randomExercise = new Exercise();
        try {
            const exercises = await Exercise.find({});
            randomExercise = ExerciseRandomiser.getRandomisedExerciseProgramme(exercises, 1)[0];    
        } catch (error) {
            console.error(`Unable to get random exercise. Error: ${error}`);
        }

        return randomExercise;
    }

    static async getRandomisedProgramme(numberOfExercises) {
        let randomExercises = [];
        try {
            const exercises = await Exercise.find({});
            randomExercises = ExerciseRandomiser.getRandomisedExerciseProgramme(exercises, numberOfExercises);    
        } catch (error) {
            console.error(`Unable to get exercise programme. Error: ${error}`);
        }

        return randomExercises;
    }

    static async addExercise(exercise) {    
        try {

            const newExercise = new Exercise({
                _id: new mongoose.Types.ObjectId(),
                name: exercise.name,
                focus: exercise.focus,
                difficulty: exercise.difficulty,
            });
            return await Exercise.create(newExercise);    
        } catch (error) {
            console.error(`Could not create an exercise for ${exercise.name}. Error: ${error}`);
        }
    }
}