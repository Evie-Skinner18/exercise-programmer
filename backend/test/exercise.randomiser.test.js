import assert from "assert";
import { Exercise } from "../models/exercise.js";
import ExerciseRandomiser from "../utils/exercise.randomiser.js";

describe('ExerciseRandomiser', function () {
  describe('getRandomisedExerciseProgramme()', function () {
    it('should return an empty array when no exercises are provided', function () {
        const randomisedExerciseProgramme = ExerciseRandomiser.getRandomisedExerciseProgramme([], 0);
        assert.equal(randomisedExerciseProgramme.length, 0);
    });
  });

  describe('getRandomisedExerciseProgramme()', function () {
    it('should return an empty array when the amount of exercises desired is greater than the number of exercises to pick from', function () {
        const exercisesToPickFrom = [
            new Exercise({ name: "Pushup" }),
            new Exercise({ name: "Situp" })
        ];
        const amountForProgramme = 5;
        const randomisedExerciseProgramme = ExerciseRandomiser.getRandomisedExerciseProgramme(exercisesToPickFrom, amountForProgramme);

        assert.equal(randomisedExerciseProgramme.length, 0);
    });
  });

  describe('getRandomisedExerciseProgramme()', function () {
    it('should return an array of 3 unique randomised exercises when the amount of exercises desired is 3', function () {
        const exercisesToPickFrom = [
            new Exercise({ name: "Pushup" }),
            new Exercise({ name: "Situp" }),
            new Exercise({ name: "Hollow hold" }),
            new Exercise({ name: "Handstand" }),
            new Exercise({ name: "Deep lunge" }),
            new Exercise({ name: "Kettlebell swing" }),
            new Exercise({ name: "Bench press" })
        ];
        const amountForProgramme = 3;
        const randomisedExerciseProgramme = ExerciseRandomiser.getRandomisedExerciseProgramme(exercisesToPickFrom, amountForProgramme);
        assert.equal(randomisedExerciseProgramme.length, amountForProgramme);
    });
  });

  describe('getRandomisedExerciseProgramme() - when the amount of exercises desired is 0', function () {
    it('should return an array of unique randomised exercises, of length equal to the length of the exercisesToPickFrom array', function () {
        const exercisesToPickFrom = [
            new Exercise({ name: "Pushup" }),
            new Exercise({ name: "Situp" }),
            new Exercise({ name: "Hollow hold" }),
            new Exercise({ name: "Handstand" }),
            new Exercise({ name: "Deep lunge" }),
            new Exercise({ name: "Kettlebell swing" }),
            new Exercise({ name: "Bench press" })
        ];
        const amountForProgramme = 0;
        const randomisedExerciseProgramme = ExerciseRandomiser.getRandomisedExerciseProgramme(exercisesToPickFrom, amountForProgramme);
        assert.equal(randomisedExerciseProgramme.length, exercisesToPickFrom.length);
    });
  });

});