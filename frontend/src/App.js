import { Switch, Route, Link } from "react-router-dom";
import Navbar from "./navigation/navbar";
import ExerciseProgrammerContainer from "./ExerciseProgrammerContainer";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <ExerciseProgrammerContainer></ExerciseProgrammerContainer>
    </div>
  );
}

export default App;