import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import Exercise from "./exercise";

function TrainingProgramme() {
    const numberOfExercises = useParams()["numberOfExercises"];
    const [ randomExerciseList, setTrainingProgramme ] = useState([]);

    useEffect(() => {
        getTrainingProgramme();
    }, []);

    async function getTrainingProgramme() {
        const provider = new ExercisesProvider();
        const getTrainingProgrammeResponse = await provider.getTrainingProgramme(numberOfExercises);
        setTrainingProgramme(getTrainingProgrammeResponse.randomExercises);
    }

    if(randomExerciseList.length > 0) {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-green-700 pb-5">Enjoy your randomised training programme!</h2>
                { randomExerciseList.map((exercise, index) => (
                    <Exercise exercise={exercise} showHeaders={true} key={exercise._id}></Exercise>
                ))}
            </div>
        );    
    } else {
        return (
            <div className="exercise-list p-16">
            </div>
        );
    }

}

export default TrainingProgramme;