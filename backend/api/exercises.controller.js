import ExercisesProvider from "./providers/exercises.provider.js";

export default class ExercisesController {

    static async get(req, res, next) {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage, 10) : 20;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;

        let filters = {}
        if (req.query.focus) {
            filters.focus = req.query.focus
        } else if (req.query.difficulty) {
            filters.difficulty = req.query.difficulty
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const searchExercisesParams = { 
            filters: filters, 
            pageNumber: pageNumber, 
            exercisesPerPage: exercisesPerPage
        };

        const exercises = await ExercisesProvider.searchExercises(searchExercisesParams);
        let response = {
            exercises: exercises,
            pageNumber: pageNumber,
            filters: filters,
            exercisesPerPage: restaurantsPerPage,
        }

        res.json(response);
    }
}