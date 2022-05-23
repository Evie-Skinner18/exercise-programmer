import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import Exercise from "./exercise";

function TrainingProgramme() {
    const numberOfExercises = useParams()["numberOfExercises"];
    const [ randomExerciseList, setTrainingProgramme ] = useState([]);

    useEffect(() => {
        if (randomExerciseList.length === 0) {
            getTrainingProgramme();
        }
    })

    // issue 1: too many requests   
    async function getTrainingProgramme() {
        const provider = new ExercisesProvider();
        const getTrainingProgrammeResponse = await provider.getTrainingProgramme(numberOfExercises);
        setTrainingProgramme(getTrainingProgrammeResponse.exercises);
    }

    if(randomExerciseList.length > 0) {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-green-700">Enjoy your randomised training programme!</h2>
                { randomExerciseList.map((exercise, index) => (
                    <Exercise exercise={exercise} key={exercise._id}></Exercise>
                ))}
            </div>
        );    
    } else {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-orange-700">Loading super cool training programme...</h2>
            </div>
        );
    }

}

export default TrainingProgramme;