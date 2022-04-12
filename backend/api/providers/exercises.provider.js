import { Exercise } from "../../models/exercise.js";
import ExerciseRandomiser from "../../utils/exercise.randomiser.js";

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
}