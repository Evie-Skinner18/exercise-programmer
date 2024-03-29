import { Link } from 'react-router-dom';
import './App.css';

function ExerciseProgrammerContainer() {
  return (
    <div className="exercise-programmer-container">
        <header className="App-header mobile:pl-10">
            <h1 className="text-green-200">Welcome to Exercise Programmer!</h1>
            <button className="border-solid rounded-full">
              <Link to={"/random-exercise"} className="text-slate-200">Give me a random exercise</Link>
            </button>
            <button className="border-solid rounded-full">
              <Link to={"/form"} className="text-yellow-2 00">Give me a randomised training programme</Link>
            </button>
        </header>
    </div>
  );
}

export default ExerciseProgrammerContainer;