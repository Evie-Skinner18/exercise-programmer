import ExercisesService from "./services/exercises.service";
import { IFilterOptions, SearchParameters } from "./ExerciseSearchOptions";
import { Request, Response } from "express";
import { IExercise } from "../models/exercise";

export default class ExercisesController {
    exercisesService: ExercisesService;

    constructor() {
        this.exercisesService = new ExercisesService();
    }

    public async get(req: Request, res: Response): Promise<void> {
        const exercisesPerPage = req.query.exercisesPerPage ? parseInt(req.query.exercisesPerPage as string, 10) : 10;
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

        const response = await this.exercisesService.searchExercises(searchExercisesParams);
       
        res.json(response);
    }

    public async getRandom(req: Request, res: Response): Promise<void> {
        const response = await this.exercisesService.getRandomExercise();

        res.json(response);
    }

    public async getProgramme(req: Request, res: Response): Promise<void> {
        const numberOfExercises = req.query.number ? parseInt(req.query.number as string) : 0;
        const response = await this.exercisesService.getRandomisedProgramme(numberOfExercises);

        res.json(response);
    }

    public async post(req: Request, res: Response): Promise<void> {
        const exercise: IExercise = req.body.exercise; // will this work with IExercise if there's no _id going in?
        const response = await this.exercisesService.addExercise(exercise);

        res.json(response);
    }
}