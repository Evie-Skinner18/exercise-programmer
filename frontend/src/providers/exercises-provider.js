import { HttpClient } from "./http-client";

export default class ExercisesProvider {
    async getExercises(){
        const axiosClient = await HttpClient.axiosClient();
        
        let getExercisesResponse = [];
        const response = await axiosClient.get("exercises/search");

        if (response.data) {
            getExercisesResponse = response.data;
        }

        return getExercisesResponse;
    }
}