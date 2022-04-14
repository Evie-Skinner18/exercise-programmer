import {Route, Routes } from "react-router-dom";
import Navbar from "./navigation/navbar";
import ExerciseProgrammerContainer from "./ExerciseProgrammerContainer";
import ExerciseList from "./components/exercise-list";
import Login from "./components/login";
import AddExercise from "./components/add-exercise";
import Exercise from "./components/exercise";
import TrainingProgramme from "./components/training-programme";
import TrainingProgrammeForm from "./components/training-programme-form";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ExerciseProgrammerContainer />} />
        <Route path="/exercise-list" element={<ExerciseList />} />
        <Route path="/random-exercise" element={<Exercise />} />
        <Route path="/form" element={<TrainingProgrammeForm />} />
        <Route path="/random-programme" element={<TrainingProgramme />}>
            <Route path=":numberOfExercises" element={<TrainingProgramme />} />
        </Route>
        <Route path="/add-exercise" element={<AddExercise />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;