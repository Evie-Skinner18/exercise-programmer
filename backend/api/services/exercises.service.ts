import { IExercise, Exercise, Category } from "../../models/exercise";
import { IFilterOptions, SearchParameters } from "../ExerciseSearchOptions";
import ExerciseRandomiser from "../../utils/exercise.randomiser";
import mongoose from "mongoose";

export default class ExercisesService {

    public async searchExercises(searchExercisesParams: SearchParameters): Promise<ISearchExercisesResponse> {

        let searchExercisesResponse: ISearchExercisesResponse = {
            exercises: []
        };

        try {
            let query: mongoose.FilterQuery<IExercise> = {};

            if (searchExercisesParams.filters) {
                if ("name" in searchExercisesParams.filters) {
                    query = { $text: { $search: searchExercisesParams.filters.name as string } }
                } else if ("difficulty" in searchExercisesParams.filters) {
                    query = { "difficulty": { $eq: searchExercisesParams.filters.difficulty } }
                } else if ("focus" in searchExercisesParams.filters) {
                    query = { "focus": { $eq: searchExercisesParams.filters.focus } }
                } else if ("category" in searchExercisesParams.filters) {
                    query = { "category": { $eq: searchExercisesParams.filters.category } }
                }
            }

            searchExercisesResponse.exercises = await Exercise.find(query)
                .limit(searchExercisesParams.exercisesPerPage)
                .skip(searchExercisesParams.exercisesPerPage * searchExercisesParams.pageNumber)
                .sort({ dateAdded: "desc" });

            searchExercisesResponse.totalNumberAvailable = await Exercise.countDocuments();
            searchExercisesResponse.exercisesPerPage = searchExercisesParams.exercisesPerPage;
            searchExercisesResponse.pageNumber = searchExercisesParams.pageNumber;
            searchExercisesResponse.totalNumberOfPages = Math.ceil(
                searchExercisesResponse.totalNumberAvailable / searchExercisesParams.exercisesPerPage
            );
        } catch (error) {
            console.error(`Unable to find exercises. Error:${error}`);
            return searchExercisesResponse;
        }

        return searchExercisesResponse;
    }

    public async getRandomExercise(): Promise<IRandomExerciseResponse> {
        let randomExerciseResponse: IRandomExerciseResponse = {
            randomExercise: new Exercise()
        };

        try {
            const allExercises = await Exercise.find({});
            randomExerciseResponse.randomExercise = ExerciseRandomiser.getRandomisedExerciseProgramme(allExercises, 1)[0];    
        } catch (error) {
            console.error(`Unable to get random exercise. Error: ${error}`);
        }

        return randomExerciseResponse;
    }

    public async getRandomisedProgramme(numberOfExercises: number): Promise<IRandomisedProgrammeResponse> {
        let randomisedProgrammeResponse: IRandomisedProgrammeResponse = {
            randomExercises: []
        };

        try {
            const allExercises = await Exercise.find({});
            randomisedProgrammeResponse.randomExercises = ExerciseRandomiser.getRandomisedExerciseProgramme(allExercises, numberOfExercises);    
        } catch (error) {
            console.error(`Unable to get exercise programme. Error: ${error}`);
        }

        return randomisedProgrammeResponse;
    }

    public async addExercise(exerciseToCreate: IExercise): Promise<IAddExerciseResponse> { 
        let addExerciseResponse: IAddExerciseResponse = {
            alreadyExists: false,
            created: false
        };

        const alreadyExists = await this.exerciseAlreadyExists(exerciseToCreate);

        if (alreadyExists) {
            addExerciseResponse.alreadyExists = true;
            addExerciseResponse.message = `${exerciseToCreate.name} already exists. Could not create exercise.`;
            addExerciseResponse.created = false;
        } else {
            // do I still need this?
            const newExercise: IExercise = new Exercise({
                _id: new mongoose.Types.ObjectId(),
                name: exerciseToCreate.name,
                focus: exerciseToCreate.focus,
                category: exerciseToCreate.category.trim().toLowerCase(),
                difficulty: exerciseToCreate.difficulty,
                dateAdded: new Date()
            });
            const exercise = await Exercise.create(newExercise);
            addExerciseResponse.alreadyExists = false;
            addExerciseResponse.exercise = exercise;
            addExerciseResponse.created = true;
        }

        return addExerciseResponse;
    }

    private async exerciseAlreadyExists(exercise: IExercise): Promise<boolean> {
        const searchResults = await Exercise.find({name: {
            $regex: `^${exercise.name.trim().toLowerCase()}$`, 
            $options: 'i'
        }});          

        const exerciseMatchingNameAlreadyExists = searchResults.length > 0;
        return exerciseMatchingNameAlreadyExists;
    }
}

interface ISearchExercisesResponse {
    exercises: IExercise[];
    totalNumberAvailable?: number;
    pageNumber?: number;
    filters?: IFilterOptions;
    exercisesPerPage?: number;
    totalNumberOfPages?: number;
}

interface IRandomisedProgrammeResponse {
    randomExercises: IExercise[]
}

interface IRandomExerciseResponse {
    randomExercise: IExercise
}

interface IAddExerciseResponse {
    alreadyExists: boolean;
    message?: string;
    created: boolean;
    exercise?: IExercise;
}