import { IExercise } from "../models/exercise";
// might want to influence the random selection with focus, difficulty etc

export default class ExerciseRandomiser {

    public static getRandomisedExerciseProgramme(exercisesToPickFrom: IExercise[], amountForProgramme: Number) {
        let randomisedExercises = [];
        
        if(exercisesToPickFrom && exercisesToPickFrom.length > 0 
            && exercisesToPickFrom.length >= amountForProgramme) {
            
            const noAmountSpecified = amountForProgramme == 0 || !amountForProgramme;
            amountForProgramme = noAmountSpecified ? exercisesToPickFrom.length : amountForProgramme;
            
            let randomNumbersAlreadyUsed: Number[] = [];
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

    private static getRandomNumber(maxValue: number) {
        return Math.floor(Math.random() * maxValue);
    }
}