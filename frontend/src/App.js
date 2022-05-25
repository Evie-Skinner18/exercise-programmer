import {Route, Routes } from "react-router-dom";
import Navbar from "./navigation/navbar";
import ExerciseProgrammerContainer from "./ExerciseProgrammerContainer";
import ExerciseList from "./components/exercise-list";
import Login from "./components/login";
import TrainingProgramme from "./components/training-programme";
import TrainingProgrammeForm from "./components/training-programme-form";
import SingleRandomExerciseContainer from "./components/single-random-exercise-container";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ExerciseProgrammerContainer />} />
        <Route path="/exercise-list" element={<ExerciseList />} />
        <Route path="/random-exercise" element={<SingleRandomExerciseContainer />} />
        <Route path="/form" element={<TrainingProgrammeForm />} />
        <Route path="/random-programme" element={<TrainingProgramme />}>
            <Route path=":numberOfExercises" element={<TrainingProgramme />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;