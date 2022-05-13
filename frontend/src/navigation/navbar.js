import { Link } from "react-router-dom";
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={ styles.navbar }>
        <nav>
            <li>
                <Link to={"/login"} className='text-blue-700'>
                    <i className="fa-solid fa-right-to-bracket"></i>
                </Link>
            </li>
            <li>
                <Link to={"/add-exercise"}>
                    <i className="fa-solid fa-add"></i>
                </Link>
            </li>
            <li>
                <Link to={"/exercise-list"}>
                    <i className="fa-solid fa-dumbbell"></i>
                </Link>
            </li>
            <li>
                <Link to={"/"}>
                    <i className="fa-solid fa-home"></i>
                </Link>
            </li>
        </nav>
    </div>
  );
}

export default Navbar;