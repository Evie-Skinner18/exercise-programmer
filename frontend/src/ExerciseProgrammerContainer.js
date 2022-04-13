import { Link } from 'react-router-dom';
import './App.css';

function ExerciseProgrammerContainer() {
  return (
    <div className="exercise-programmer-container">
        <header className="App-header">
            <h1 className="text-red-700 underline">Welcome to Exercise Programmer!</h1>
            <button>
              <Link to={"/random-exercise"} className='text-slate-200'>Give me a random exercise</Link>
            </button>
            <button>
              <Link to={"/random-programme"} className='text-yellow-200'>Give me a randomised training programme</Link>
            </button>
        </header>
    </div>
  );
}

export default ExerciseProgrammerContainer;