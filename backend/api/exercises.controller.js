import ExercisesService from "./services/exercises.service.js";

export default class ExercisesController {

    constructor() {
        this.exercisesService = new ExercisesService();
        this.message = "Hello";

        console.log(this.message + " from constructor");
    }

    async get(req, res, next) {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage, 10) : 100;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber, 10) : 0;

        let filters = {}
        if (req.query.focus) {
            filters.focus = req.query.focus.trim().toLower()
        } else if (req.query.difficulty) {
            filters.difficulty = req.query.difficulty.trim().toLower()
        } else if (req.query.name) {
            filters.name = req.query.name.trim().toLower()
        }

        const searchExercisesParams = { 
            filters: filters,
            pageNumber: pageNumber, 
            exercisesPerPage: exercisesPerPage
        };

        const exercises = await this.exercisesService.searchExercises(searchExercisesParams);
        let response = {
            exercises: exercises,
            pageNumber: pageNumber,
            filters: filters,
            exercisesPerPage: exercisesPerPage,
            // totalNumberAvailable
        }

        res.json(response);
    }

    async getRandom(req, res, next) {
        const randomExercise = await this.exercisesService.getRandomExercise();
        const response = {
            randomExercise: randomExercise
        }

        res.json(response);
    }

    async getProgramme(req, res, next) {
        const numberOfExercises = req.query.number ? parseInt(req.query.number) : 0;
        const exercises = await this.exercisesService.getRandomisedProgramme(numberOfExercises);
        const response = {
            exercises: exercises
        }

        res.json(response);
    }

    async post(req, res, next) {
        const exercise = req.body.exercise;
        // in strict mode (JS clsses) 'this' gets reset to undefined
        console.log(this.message + " from POST method");
        const response = await this.exercisesService.addExercise(exercise);

        res.json(response);
    }
}