import { Exercise } from "../../models/exercise.js";

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
}