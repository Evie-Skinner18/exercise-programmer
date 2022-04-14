import { useEffect, useState } from 'react';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import Exercise from "./exercise";

const ExerciseList = props => {
    const [ exerciseList, setExerciseList ] = useState([]);

    useEffect(() => {
        if (exerciseList.length === 0) {
            getExerciseList();
        }
    })

    async function getExerciseList() {
        const provider = new ExercisesProvider();
        const getExercisesResponse = await provider.getExercises();
        setExerciseList(getExercisesResponse.exercises);
    }

    if(exerciseList.length > 0) {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-green-700">All exercises</h2>
                { exerciseList.map((exercise, index) => (
                    <Exercise exercise={exercise} key={exercise._id}></Exercise>
                ))}
            </div>
        );    
    } else {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-orange-700">Loading super cool movements...</h2>
            </div>
        );
    }
}

export default ExerciseList;