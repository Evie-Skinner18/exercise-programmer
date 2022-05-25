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
            getExerciseList(0);
        }
    })

    async function getExerciseList(desiredPageNumber) {
        const provider = new ExercisesProvider();
        const getExercisesResponse = await provider.getExercises(desiredPageNumber);
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
        const previousPage = pageNumber - 1;
        if (previousPage >= 0) {
            setPageNumber(previousPage);
            getExerciseList(previousPage);    
        }
      };
    
    const goToNextPage = () => {
        const nextPage = pageNumber + 1;
        if (nextPage < numberOfPages) {
            setPageNumber(nextPage);
            getExerciseList(nextPage);    
        }
    };

    const goToPage = (pageIndex) => {
        setPageNumber(pageIndex);
        getExerciseList(pageIndex);    
    }

    if(exerciseList.length > 0) {
        return (
            <div className="exercise-list p-16">
                <h2 className="text-green-700">All exercises</h2>
                <h3>Page { pageNumber + 1} of { numberOfPages } </h3>
                <button onClick={ goToPreviousPage }>Previous</button>
                {pages.map((pageIndex) => (
                    <button key={pageIndex} onClick={() => goToPage(pageIndex)}>
                    {pageIndex + 1}
                    </button>
                ))}
                <button onClick={ goToNextPage }>Next</button>
                <div onClick={ showForm }>
                    <i className="fa-solid fa-add"></i>Add new
                </div>
                { addExerciseForm }
                { exerciseList.map((exercise, index) => (
                    <Exercise exercise={exercise} showHeaders={false} key={exercise._id}></Exercise>
                ))}
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