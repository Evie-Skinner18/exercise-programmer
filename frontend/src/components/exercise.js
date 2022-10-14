import '../App.css';

function Exercise({ exercise, showHeaders }) {
  if (showHeaders) {
    return (
      <div className="exercise">
        <h2 className="text-blue-500">
          <strong>Name:</strong> { exercise.name }
        </h2>
        <p>
          <strong>Focus:</strong> { exercise.focus }
        </p>
        <p>
          <strong>Category:</strong> { exercise.category }
        </p>
        <p><strong>Difficulty out of 5:</strong> { exercise.difficulty }</p>
        <hr className='pb-5' />
      </div>
    );
    
} else {
  return (
    <div className="exercise">
      <h2 className="text-blue-500">{ exercise.name }</h2>
      <p>{ exercise.focus }</p>
      <p>{ exercise.category }</p>
      <p>{ exercise.difficulty }</p>
      <hr className='pb-5' />
    </div>
  );
  }
}

export default Exercise;