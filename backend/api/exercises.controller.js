import ExercisesProvider from "./services/exercises.service.js";

export default class ExercisesController {

    static async get(req, res, next) {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage, 10) : 50;
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
            exercisesPerPage: exercisesPerPage,
        }

        res.json(response);
    }

    static async getRandom(req, res, next) {
        const randomExercise = await ExercisesProvider.getRandomExercise();
        const response = {
            randomExercise: randomExercise
        }

        res.json(response);
    }

    static async getProgramme(req, res, next) {
        const numberOfExercises = req.query.number ? parseInt(req.query.number) : 0;
        const exercises = await ExercisesProvider.getRandomisedProgramme(numberOfExercises);
        const response = {
            exercises: exercises
        }

        res.json(response);
    }

    static async post(req, res, next) {
        const exercise = req.body.exercise;

        const response = await ExercisesProvider.addExercise(exercise);

        res.json(response);
    }
}