import { IExercise, Exercise } from "../../models/exercise";
import { SearchParameters } from "../ExerciseSearchOptions";
import ExerciseRandomiser from "../../utils/exercise.randomiser";
import mongoose from "mongoose";

// how do I get the total no available?
export default class ExercisesService {

    async searchExercises(searchExercisesParams: SearchParameters) {

        let exercises: IExercise[] = [];

        try {
            let query: mongoose.FilterQuery<IExercise> = {};

            if (searchExercisesParams.filters) {
                if ("name" in searchExercisesParams.filters) {
                    query = { $text: { $search: searchExercisesParams.filters.name as string } }
                } else if ("difficulty" in searchExercisesParams.filters) {
                    query = { "difficulty": { $eq: searchExercisesParams.filters.difficulty } }
                } else if ("focus" in searchExercisesParams.filters) {
                    query = { "focus": { $eq: searchExercisesParams.filters.focus } }
                }
            }

            exercises = await Exercise.find(query)
            .limit(searchExercisesParams.exercisesPerPage)
            .skip(searchExercisesParams.exercisesPerPage * searchExercisesParams.pageNumber);
        } catch (error) {
            console.error(`Unable to find exercises. Error:${error}`);
            return exercises;
        }

        return exercises;
    }

    async getRandomExercise(): Promise<IExercise> {
        let randomExercise: IExercise = new Exercise();
        try {
            const allExercises = await Exercise.find({});
            randomExercise = ExerciseRandomiser.getRandomisedExerciseProgramme(allExercises, 1)[0];    
        } catch (error) {
            console.error(`Unable to get random exercise. Error: ${error}`);
        }

        return randomExercise;
    }

    async getRandomisedProgramme(numberOfExercises: number): Promise<IExercise[]> {
        let randomExercises: IExercise[] = [];
        try {
            const allExercises = await Exercise.find({});
            randomExercises = ExerciseRandomiser.getRandomisedExerciseProgramme(allExercises, numberOfExercises);    
        } catch (error) {
            console.error(`Unable to get exercise programme. Error: ${error}`);
        }

        return randomExercises;
    }

    async exerciseAlreadyExists(exercise: IExercise): Promise<boolean> {
        const searchResults = await Exercise.find({})
            .where("name".trim().toLowerCase())
            .equals(exercise.name.trim().toLowerCase());

        const exerciseMatchingNameAlreadyExists = searchResults.length > 0;
        return exerciseMatchingNameAlreadyExists;
    }

    async addExercise(exerciseToCreate: IExercise): Promise<IAddExerciseResponse> { 
        let addExerciseResponse: IAddExerciseResponse = {
            alreadyExists: false,
            created: false
        };

        const alreadyExists = await this.exerciseAlreadyExists(exerciseToCreate);

        if (alreadyExists) {
            addExerciseResponse.alreadyExists = true;
            addExerciseResponse.message = `${exerciseToCreate.name} already exists. Could not create exercise.`;
            addExerciseResponse.created = false;
        }
        try {
            // do I still need this?
            const newExercise: IExercise = new Exercise({
                _id: new mongoose.Types.ObjectId(),
                name: exerciseToCreate.name,
                focus: exerciseToCreate.focus,
                difficulty: exerciseToCreate.difficulty
            });
            const exercise = await Exercise.create(newExercise);
            addExerciseResponse.alreadyExists = false;
            addExerciseResponse.exercise = exercise;
            addExerciseResponse.created = true;
        } catch (error) {
            console.error(`Could not create an exercise for ${exerciseToCreate.name}. Error: ${error}`);
        }

        return addExerciseResponse;
    }
}

interface IAddExerciseResponse {
    alreadyExists: boolean;
    message?: string;
    created: boolean;
    exercise?: IExercise;
}