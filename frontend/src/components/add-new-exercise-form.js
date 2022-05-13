import { useState } from "react";
import { useNavigate } from "react-router-dom";   
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import ToastMessage from "./toast-message";

function AddNewExerciseForm() {
    const [newExercise, setNewExercise] = useState({
        name: "",
        focus: "",
        difficulty: ""
    });

    let showToastMessage = false;
    let exerciseSuccessfullyAdded = false;

    let toastMessageStyles = {
        toastMessage : {
            display : `${showToastMessage? "inline" : "none"}`
        }
    };

    const navigate = useNavigate();

    async function submitNewExercise(event) {
        event.preventDefault();
        const provider = new ExercisesProvider();

        const exerciseRequestBody = { exercise: newExercise };
        const addExerciseResponse = await provider.addExercise(exerciseRequestBody);

        if (addExerciseResponse.name) {
            exerciseSuccessfullyAdded = true;
        }

        redirectToExerciseList();
    }

    function redirectToExerciseList() {
        navigate("/exercise-list");
    }

    // how would I make just one reuseable event handler?
    const handleNameInputChange = (event) => {
        event.persist();
        setNewExercise((newExercise) => ({
            ...newExercise,
            name: event.target.value,
        }));
    };

    const handleFocusInputChange = (event) => {
        event.persist();
        setNewExercise((newExercise) => ({
            ...newExercise,
            focus: event.target.value,
        }));
    };

    const handleDifficultyInputChange = (event) => {
        event.persist();
        setNewExercise((newExercise) => ({
            ...newExercise,
            difficulty: event.target.value,
        }));
    };

    return (
        <div className="add-exercise-form p-16">
            <form onSubmit={ submitNewExercise }>
                <input
                    placeholder="Exercise name"
                    type="text" 
                    name="name"
                    className="mr-4 p-2 border-solid border-2"
                    value={  newExercise.name } 
                    onChange={ (e) => handleNameInputChange(e) } 
                />
                <input 
                    placeholder="Exercise focus area (e.g core)"
                    type="text" 
                    name="focus"
                    className="mr-4 p-2 border-solid border-2"
                    value={  newExercise.focus } 
                    onChange={ (e) => handleFocusInputChange(e) } 
                />
                <input
                    placeholder="Exercise difficulty out of 5"
                    type="number" 
                    name="difficulty" 
                    className="mr-4 p-2 border-solid border-2"
                    value={  newExercise.difficulty } 
                    onChange={ (e) => handleDifficultyInputChange(e) }
                    min="1"
                    max="5"
                />
                <button className="border-solid border-2 bg-green-500 border-slate-200 rounded-full p-2">
                    Add
                </button>
            </form>
            <ToastMessage 
                exercise={ newExercise } 
                isSuccessMessage={ exerciseSuccessfullyAdded } 
                toastMessageStyles={ toastMessageStyles }>
            </ToastMessage>
        </div>
    );
}

export default AddNewExerciseForm;