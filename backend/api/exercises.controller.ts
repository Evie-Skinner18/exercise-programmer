import ExercisesService from "./services/exercises.service";
import { Request, Response } from "express";

export default class ExercisesController {
    exercisesService: ExercisesService;

    constructor() {
        this.exercisesService = new ExercisesService();
    }

    // might need to return Promise<Response>
    // make a type for Filters
    // TS-ify the service
    async get(req: Request, res: Response): Promise<void> {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage as string, 10) : 100;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber as string, 10) : 0;

        let filters = {}
        if (req.query.focus) {
            filters.focus = (req.query.focus as string).trim().toLowerCase()
        } else if (req.query.difficulty) {
            filters.difficulty = (req.query.difficulty as string).trim().toLowerCase()
        } else if (req.query.name) {
            filters.name = (req.query.name as string).trim().toLowerCase()
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

    async getRandom(req: Request, res: Response): Promise<void> {
        const randomExercise = await this.exercisesService.getRandomExercise();
        const response = {
            randomExercise: randomExercise
        }

        res.json(response);
    }

    async getProgramme(req: Request, res: Response): Promise<void> {
        const numberOfExercises = req.query.number ? parseInt(req.query.number as string) : 0;
        const exercises = await this.exercisesService.getRandomisedProgramme(numberOfExercises);
        const response = {
            exercises: exercises
        }

        res.json(response);
    }

    async post(req: Request, res: Response): Promise<void> {
        const exercise = req.body.exercise;
        const response = await this.exercisesService.addExercise(exercise);

        res.json(response);
    }
}