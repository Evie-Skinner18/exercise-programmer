import ExercisesService from "./services/exercises.service";
import { IFilterOptions, SearchParameters } from "./ExerciseSearchOptions";
import { Request, Response } from "express";
import { IExercise } from "../models/exercise";

export default class ExercisesController {
    exercisesService: ExercisesService;

    constructor() {
        this.exercisesService = new ExercisesService();
    }

    async get(req: Request, res: Response): Promise<void> {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage as string, 10) : 100;
        const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber as string, 10) : 0;

        let filters: IFilterOptions = {};
        if (req.query.focus) {
            filters.focus = (req.query.focus as string).trim().toLowerCase()
        } else if (req.query.difficulty) {
            filters.difficulty = (req.query.difficulty as string).trim().toLowerCase()
        } else if (req.query.name) {
            filters.name = (req.query.name as string).trim().toLowerCase()
        }

        const searchExercisesParams = new SearchParameters(filters, pageNumber, exercisesPerPage);

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

    // make igetprogrammeresponse
    async getProgramme(req: Request, res: Response): Promise<void> {
        const numberOfExercises = req.query.number ? parseInt(req.query.number as string) : 0;
        const exercises = await this.exercisesService.getRandomisedProgramme(numberOfExercises);
        const response = {
            exercises: exercises
        }

        res.json(response);
    }

    async post(req: Request, res: Response): Promise<void> {
        const exercise: IExercise = req.body.exercise; // will this work with IExercise if there's no _id going in?
        const response = await this.exercisesService.addExercise(exercise);

        res.json(response);
    }
}