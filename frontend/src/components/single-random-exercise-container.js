import '../App.css';
import { useEffect, useState } from "react";
import ExercisesProvider from "../providers/exercises-provider";
import Exercise from "./exercise";

function SingleRandomExerciseContainer() {
    const [ randomExercise, setrandomExercise ] = useState({});

    useEffect(() => {
        if (!randomExercise.name) {
            getRandomExercise();
        }
    });

    async function getRandomExercise() {
        const provider = new ExercisesProvider();
        const getRandomExerciseResponse = await provider.getRandomExercise();
        setrandomExercise(getRandomExerciseResponse.randomExercise);
    }

    return (
        <div className="single-random-exercise-container">
            <header className="App-header">
                <h2 className="text-red-200">Random exercise!</h2>
                <Exercise exercise={randomExercise} showHeaders={true}></Exercise>
            </header>
        </div>
    );
}

export default SingleRandomExerciseContainer;