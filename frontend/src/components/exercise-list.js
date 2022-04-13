import { useEffect, useState } from 'react';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import Exercise from "./exercise";



const ExerciseList = props => {
    const [ exerciseList, setExerciseList ] = useState([]);

    useEffect(() => {
        getExerciseList();
    })

    function getExerciseList() {
        const provider = new ExercisesProvider();
        const exercises = provider.getExercises();
        setExerciseList(exercises);
    } 

    return (
        <div className="exercise-list p-16">
            <h2 className="text-orange-700">List of exercises</h2>
            { exerciseList.map((exercise, index) => (
                <Exercise exercise={exercise}></Exercise>
            ))}
        </div>
    );
}

export default ExerciseList;