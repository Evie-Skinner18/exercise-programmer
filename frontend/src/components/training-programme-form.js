import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';

function TrainingProgrammeForm({ exerciseList }) {
    const [numberOfExercisesAvailable, setNumberAvailable] = useState(0);
    const [desiredNumberOfExercises, setNumber] = useState(0);

    useEffect(() => {
        if (!exerciseList || exerciseList.length === 0) {
            getNumberOfExercisesAvailable();
        }
    })

    async function getNumberOfExercisesAvailable() {
        const provider = new ExercisesProvider();
        const getExercisesResponse = await provider.getExercises();
        setNumberAvailable(getExercisesResponse.exercises.length);
    }

    const submitTrainingProgrammeForm = (event) => {
        event.preventDefault();
    }

    return (
        <div className="training-programme-form p-16">
            <h2 className="text-blue-400">
                There are { numberOfExercisesAvailable } movements available in your exercise list. 
                How many of those do you need in your programme (minimum of two)?
            </h2>
            <form onSubmit={ submitTrainingProgrammeForm }>
                <input 
                    type="number" 
                    name="numberOfExercises" 
                    className="mr-4"
                    value={ desiredNumberOfExercises } 
                    onChange={ (e) => setNumber(e.target.value) }
                    min="2" 
                    max={ numberOfExercisesAvailable }
                />
                <button className="border-solid border-2 bg-slate-200 border-green-200 rounded-full p-2">
                    <Link to={`/random-programme/${desiredNumberOfExercises}`}>Get programme</Link>
                </button>
            </form>
        </div>
    );
}

export default TrainingProgrammeForm;