import { HttpClient } from "./http-client";
import Sanitiser from "../utils/sanitiser";

export default class ExercisesProvider {
    async getExercises(pageNumber){
        const axiosClient = await HttpClient.axiosClient();
        
        let getExercisesResponse = {};
        const response = await axiosClient.get(`exercises/search?pageNumber=${pageNumber}`);

        if (response.data) {
            getExercisesResponse = response.data;
        }

        return getExercisesResponse;
    }

    async getTrainingProgramme(numberOfExercises){
        const axiosClient = await HttpClient.axiosClient();
        
        let getExercisesResponse = {};
        const response = await axiosClient.get(`exercises/programme?number=${numberOfExercises}`);

        if (response.data) {
            getExercisesResponse = response.data;
        }

        return getExercisesResponse;
    }

    async addExercise(exercise) {
        const axiosClient = await HttpClient.axiosClient();

        const sanitiser = new Sanitiser();
        exercise.exercise.name = sanitiser.sanitiseUserInput(exercise.exercise.name);
        exercise.exercise.focus = sanitiser.sanitiseUserInput(exercise.exercise.focus);
        exercise.exercise.difficulty = sanitiser.sanitiseUserInput(exercise.exercise.difficulty);

        let addExerciseResponse = {};
        const response = await axiosClient.post(`exercises/`, exercise);

        if (response.data) {
            addExerciseResponse = response.data;
        }

        return addExerciseResponse;
    }
}