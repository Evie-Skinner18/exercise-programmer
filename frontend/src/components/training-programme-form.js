import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ExercisesProvider from '../providers/exercises-provider';
import '../App.css';

function TrainingProgrammeForm() {
    const [numberOfExercisesAvailable, setNumberAvailable] = useState(0);
    const router = useNavigate();

    useEffect(() => {
        if (!numberOfExercisesAvailable) {
            getNumberOfExercisesAvailable();
        }
    })

    async function getNumberOfExercisesAvailable() {
        console.log(numberOfExercisesAvailable);
        const provider = new ExercisesProvider();
        const getExercisesResponse = await provider.getExercises();
        setNumberAvailable(getExercisesResponse.exercises.length);
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange"
    });

    let getProgrammeButtonTailwindClasses = isValid? 
        "border-solid border-2 bg-slate-200 border-green-200 rounded-full p-2" 
        : 
        "border-solid border-2 bg-red-500 border-slate-200 rounded-full p-2";


    function submitTrainingProgrammeForm(userInput){
        const desiredNumberOfExercises = userInput.numberOfExercises;
        router(`/random-programme/${desiredNumberOfExercises}`);
    }

    return (
        <div className="training-programme-form p-16">
            <h2 className="text-blue-400">
                There are { numberOfExercisesAvailable } movements available in your exercise list. 
                How many of those do you need in your programme (minimum of two)?
            </h2>
            <form onSubmit={ handleSubmit(submitTrainingProgrammeForm) }>
                <input 
                    type="number" 
                    name="numberOfExercises" 
                    className="mr-4"
                    {...register("numberOfExercises", { 
                        required: true, 
                        min: 2, 
                        max: numberOfExercisesAvailable, 
                        valueAsNumber: true,
                        validate: (value) => value === Math.floor(value)
                    })}
                />
                { errors.numberOfExercises && <p className="text-red-500">Please enter a whole number from 2 to { numberOfExercisesAvailable }</p> }
                <button 
                    className={ getProgrammeButtonTailwindClasses }
                    disabled={ !isValid }>
                    Get programme
                </button>
            </form>
        </div>
    );
}

export default TrainingProgrammeForm;