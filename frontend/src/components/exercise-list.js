import { Switch, Route, Link } from "react-router-dom";

import '../App.css';
import Exercise from "./exercise";

function ExerciseList() {
  return (
    <div className="exercise-list">
        <h2 className="text-orange-700">List of exercises</h2>
        <Exercise></Exercise>
    </div>
  );
}

export default ExerciseList;