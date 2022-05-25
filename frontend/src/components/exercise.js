import '../App.css';

function Exercise({ exercise, showHeaders }) {
  if (showHeaders) {
    return (
      <div className="exercise">
        <h2 className="text-blue-500">Name: { exercise.name }</h2>
        <p>Focus: { exercise.focus }</p>
        <p>Difficulty out of 5: { exercise.difficulty }</p>
      </div>
    );
    
} else {
  return (
    <div className="exercise">
      <h2 className="text-blue-500">{ exercise.name }</h2>
      <p>{ exercise.focus }</p>
      <p>{ exercise.difficulty }</p>
    </div>
  );
  }
}

export default Exercise;