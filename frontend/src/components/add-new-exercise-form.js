import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import ToastMessage from "./toast-message";

function AddNewExerciseForm({ addExercise }) {
    const [ exerciseForToast, setExerciseForToast ] = useState({});
    const [ errorMessageForToast, setErrorMessageForToast ] = useState("");
    const [ showToastMessage, setShowToastMessage ] = useState(false);

    let exerciseSuccessfullyAdded = false;

    useEffect(() => {
        setupToastMessage(exerciseForToast, errorMessageForToast, showToastMessage);
    }, [exerciseForToast, errorMessageForToast, showToastMessage]);

    function setupToastMessage(exercise, errorMessage, show) {
        setExerciseForToast(exercise);
        setErrorMessageForToast(errorMessage);
        setShowToastMessage(show);
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onChange"
    });

    let addButtonTailwindClasses = isValid? 
        "border-solid border-2 bg-green-500 border-slate-200 rounded-full p-2" 
        : 
        "border-solid border-2 bg-red-500 border-slate-200 rounded-full p-2";

    let toastMessageStyles = {
        toastMessage : {
            display : `${showToastMessage? "" : "none"}`
        }
    };

    async function submitNewExercise(newExercise) {
        const provider = new ExercisesProvider();

        const exerciseRequestBody = { exercise: newExercise };
        const addExerciseResponse = await provider.addExercise(exerciseRequestBody);

        if (addExerciseResponse.created) {
            exerciseSuccessfullyAdded = true;
            setExerciseForToast(newExercise);
        } else if (addExerciseResponse.alreadyExists) {
            exerciseSuccessfullyAdded = false;
            setErrorMessageForToast(addExerciseResponse.message);
        }

        setShowToastMessage(true);
        addExercise(exerciseSuccessfullyAdded);
    }

    return (
        <div className="add-exercise-form p-16">
            <form onSubmit={ handleSubmit(submitNewExercise) }>
                <input
                    placeholder="Exercise name"
                    type="text" 
                    name="name"
                    className="mr-4 p-2 border-solid border-2"
                    {...register("name", { required: true })}
                />
                { errors.name && <p className="text-red-500">Please enter a name for this exercise</p> }
                <input 
                    placeholder="Exercise focus area (e.g core)"
                    type="text" 
                    name="focus"
                    className="mr-4 p-2 border-solid border-2"
                    {...register("focus", { required: true })}
                />
                { errors.focus && <p className="text-red-500">Please enter a focus area for this exercise</p> }
                <input
                    placeholder="Exercise difficulty out of 5"
                    type="number"
                    step="any" 
                    name="difficulty" 
                    {...register("difficulty", { required: true, min: 1, max: 5 })}
                />
                { errors.difficulty && <p className="text-red-500">Please enter a difficulty number out of 5 for this exercise</p> }
                <button 
                    disabled={ !isValid }
                    className={ addButtonTailwindClasses     }>
                    Add
                </button>
            </form>
            <ToastMessage 
                exercise={ exerciseForToast } 
                isSuccessMessage={ exerciseSuccessfullyAdded } 
                errorMessage={ errorMessageForToast }
                toastMessageStyles={ toastMessageStyles }>
            </ToastMessage>
        </div>
    );
}

export default AddNewExerciseForm;