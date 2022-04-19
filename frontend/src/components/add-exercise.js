import '../App.css';
import AddNewExerciseForm from './add-new-exercise-form';

function AddExercise() {
  return (
    <div className="add-exercise p-16">
        <h2 className="text-blue-700">Add an exercise</h2>
        <AddNewExerciseForm></AddNewExerciseForm>
    </div>
  );
}

export default AddExercise;