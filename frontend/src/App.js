import {Route, Routes } from "react-router-dom";
import Navbar from "./navigation/navbar";
import ExerciseProgrammerContainer from "./ExerciseProgrammerContainer";
import ExerciseList from "./components/exercise-list";
import Login from "./components/login";
import AddExercise from "./components/add-exercise";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ExerciseProgrammerContainer />} />
        <Route path="/exercise-list" element={<ExerciseList />} />
        <Route path="/add-exercise" element={<AddExercise />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;