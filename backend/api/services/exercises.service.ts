import { Exercise } from "../../models/exercise.js";
import ExerciseRandomiser from "../../utils/exercise.randomiser.js";
import mongoose from "mongoose";

// how do I get the total no available?
export default class ExercisesService {
    constructor() {
        this.allExercises = Exercise.find({});
    }    

    async searchExercises({
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

            if (!this.exercisesHaveBeenLoaded()) {
                this.allExercises = await Exercise.find({});
            }

            exercises = await this.allExercises.find(query)
            .limit(exercisesPerPage)
            .skip(exercisesPerPage * pageNumber);
        } catch (error) {
            console.error(`Unable to find exercises. Error:${error}`);
            return exercises;
        }

        return exercises;
    }

    async getRandomExercise() {
        let randomExercise = new Exercise();
        try {
            if (!this.exercisesHaveBeenLoaded()) {
                this.allExercises = await Exercise.find({});
            }
            randomExercise = ExerciseRandomiser.getRandomisedExerciseProgramme(this.allExercises, 1)[0];    
        } catch (error) {
            console.error(`Unable to get random exercise. Error: ${error}`);
        }

        return randomExercise;
    }

    async getRandomisedProgramme(numberOfExercises) {
        let randomExercises = [];
        try {
            if (!this.exercisesHaveBeenLoaded()) {
                this.allExercises = await Exercise.find({});
            }
            randomExercises = ExerciseRandomiser.getRandomisedExerciseProgramme(this.allExercises, numberOfExercises);    
        } catch (error) {
            console.error(`Unable to get exercise programme. Error: ${error}`);
        }

        return randomExercises;
    }

    async exerciseAlreadyExists(exercise) {
        const queryOnName = { $text: { $eq: exercise.name.trim().toLower() } };

        if (!this.exercisesHaveBeenLoaded()) {
            this.allExercises = await Exercise.find({});
        }
        const searchResults = await this.allExercises.find(queryOnName);
        const exerciseMatchingNameAlreadyExists = searchResults.length > 0;

        return exerciseMatchingNameAlreadyExists;
    }

    async addExercise(exercise) {   
        const alreadyExists = await this.exerciseAlreadyExists(exercise); 
        if (alreadyExists) {
            return {
                alreadyExists: true,
                message: `${exercise.name} already exists. Could not create exercise.`
            };
        }
        try {
            const newExercise = new Exercise({
                _id: new mongoose.Types.ObjectId(),
                name: exercise.name,
                focus: exercise.focus,
                difficulty: exercise.difficulty
            });
            return await Exercise.create(newExercise);    
        } catch (error) {
            console.error(`Could not create an exercise for ${exercise.name}. Error: ${error}`);
        }
    }

    exercisesHaveBeenLoaded() {
        return this.allExercises.length > 0;
    }
}