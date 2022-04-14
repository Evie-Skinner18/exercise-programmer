import { HttpClient } from "./http-client";

export default class ExercisesProvider {
    async getExercises(){
        const axiosClient = await HttpClient.axiosClient();
        
        let getExercisesResponse = {};
        const response = await axiosClient.get("exercises/search");

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
}