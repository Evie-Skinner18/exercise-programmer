import { Switch, Route, Link } from "react-router-dom";

import './App.css';
import AddExercise from "./components/add-exercise";
import ExerciseList from "./components/exercise-list";
import Login from "./components/login";

function ExerciseProgrammerContainer() {
  return (
    <div className="exercise-programmer-container ml-20">
        <Login></Login>
        <header className="App-header">
            <h1 className="text-red-700 underline">Hi Tailwind!</h1>
        </header>
        <AddExercise></AddExercise>
        <ExerciseList></ExerciseList>
    </div>
  );
}

export default ExerciseProgrammerContainer;