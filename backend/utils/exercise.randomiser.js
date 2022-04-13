// import { Exercise } from "../models/exercise.js";
// import that later on if you want to influence the random selection with focus, difficulty etc

export default class ExerciseRandomiser {

    static getRandomisedExerciseProgramme(exercisesToPickFrom, amountForProgramme) {
        let randomisedExercises = [];
        
        if(exercisesToPickFrom && exercisesToPickFrom.length > 0 
            && exercisesToPickFrom.length >= amountForProgramme) {
            
            const noAmountSpecified = amountForProgramme == 0 || !amountForProgramme;
            amountForProgramme = noAmountSpecified ? exercisesToPickFrom.length : amountForProgramme;
            
            let randomNumbersAlreadyUsed = [];
            for (let i = 0; i < amountForProgramme; i++) {
                let randomNumber = this.getRandomNumber(exercisesToPickFrom.length);

                while (randomNumbersAlreadyUsed.includes(randomNumber)) {
                    randomNumber = this.getRandomNumber(exercisesToPickFrom.length);
                }

                const randomlySelectedExercise = exercisesToPickFrom[randomNumber];
                randomisedExercises.push(randomlySelectedExercise);
                randomNumbersAlreadyUsed.push(randomNumber);
            }
        }

        return randomisedExercises;
    }

    static getRandomNumber(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }
}