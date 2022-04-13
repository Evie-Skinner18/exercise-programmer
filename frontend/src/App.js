import { Switch, Route, Link } from "react-router-dom";

import './App.css';
import AddExercise from "./components/add-exercise";
import ExerciseList from "./components/exercise-list";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <Login></Login>
      <header className="App-header">
        <h1 className="text-red-700 underline">Hi Tailwind!</h1>
      </header>
      <AddExercise></AddExercise>
      <ExerciseList></ExerciseList>
    </div>
  );
}

export default App;