import { useEffect, useState } from 'react';
import '../App.css';
import ExercisesProvider from '../providers/exercises-provider';
import AddNewExerciseForm from './add-new-exercise-form';
import Exercise from "./exercise";

const ExerciseList = props => {
    const [ exerciseList, setExerciseList ] = useState([]);
    const [ addExerciseForm, setAddExerciseForm ] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    // fill an array with the numbers of numberOfPages
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);


    useEffect(() => {
        if (exerciseList.length === 0) {
            getExerciseList();
        }
    })

    async function getExerciseList() {
        const provider = new ExercisesProvider();
        const getExercisesResponse = await provider.getExercises(pageNumber);
        setExerciseList(getExercisesResponse.exercises);
        setNumberOfPages(getExercisesResponse.totalNumberOfPages);
    }

    const handleAddExercise = (successfullyAdded) => {
        if (successfullyAdded) {
            getExerciseList();
        }
    }

    function showForm() {
        setAddExerciseForm(<AddNewExerciseForm addExercise={ handleAddExercise }></AddNewExerciseForm>);
    }

    const goToPreviousPage = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        getExerciseList();
      };
    
      const goToNextPage = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        getExerciseList();
      };

    if(exerciseList.length > 0) {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-green-700">All exercises</h2>
                <h3>Page {pageNumber + 1} of { numberOfPages } </h3>
                <span onClick={ showForm }>
                    <i className="fa-solid fa-add"></i>Add new
                </span>
                { addExerciseForm }
                { exerciseList.map((exercise, index) => (
                    <Exercise exercise={exercise} key={exercise._id}></Exercise>
                ))}
                <button onClick={ goToPreviousPage }>Previous</button>
                {pages.map((pageIndex) => (
                    <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                    {pageIndex + 1}
                    </button>
                ))}
                <button onClick={ goToNextPage }>Next</button>
            </div>
        );    
    } else {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-orange-700">Loading super cool movements...</h2>
            </div>
        );
    }
}

export default ExerciseList;