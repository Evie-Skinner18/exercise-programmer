import '../App.css';

function Exercise({ exercise }) {
  return (
    <div className="exercise">
        <h2 className="text-blue-700">{ exercise.name }</h2>
        <p>{ exercise.focus }</p>
        <p>{ exercise.difficulty }</p>
    </div>
  );
}

export default Exercise;