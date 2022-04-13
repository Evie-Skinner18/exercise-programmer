import { useEffect, useState } from 'react';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import Exercise from "./exercise";

const TrainingProgramme = props => {
    const [ randomExerciseList, setTrainingProgramme ] = useState([]);

    useEffect(() => {
        if (randomExerciseList.length === 0) {
            getTrainingProgramme();
        }
    })

    async function getTrainingProgramme() {
        const provider = new ExercisesProvider();
        const numberOfExercises = 4;
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