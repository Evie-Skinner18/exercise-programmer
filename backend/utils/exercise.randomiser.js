// import { Exercise } from "../models/exercise.js";
// import that later on if you want to influence the random selection with focus, difficulty etc

export default class ExerciseRandomiser {

    static getRandomisedExerciseProgramme(exercisesToPickFrom, amountForProgramme) {
        let randomisedExercises = [];
        
        if(exercisesToPickFrom && exercisesToPickFrom.length > 0 
            && exercisesToPickFrom.length >= amountForProgramme) {
            for (let i = 0; i < amountForProgramme; i++) {
                const randomNumber = this.getRandomNumber(amountForProgramme);
                const randomlySelectedExercise = exercisesToPickFrom[randomNumber];
                console.info(`Random exercise at index ${randomNumber}: ${randomlySelectedExercise}`);
                randomisedExercises.push(randomlySelectedExercise);
            }
        }

        return randomisedExercises;
    }

    static getRandomNumber(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }
}