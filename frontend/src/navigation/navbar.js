import { Link } from "react-router-dom";
import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={ styles.navbar }>
        <nav>
            <li>
                <Link to={"/login"} className='text-blue-700'>
                    <span className="material-icons mobile:text-3xl laptop:text-2xl desktop:text-3xl">logout</span>
                </Link>
            </li>
            <li>
                <Link to={"/exercise-list"}>
                    <span className="material-icons mobile:text-3xl laptop:text-2xl desktop:text-3xl">fitness_center</span>
                </Link>
            </li>
            <li>
                <Link to={"/"}>
                    <span className="material-icons mobile:text-3xl laptop:text-2xl desktop:text-3xl">home</span>
                </Link>
            </li>
        </nav>
    </div>
  );
}

export default Navbar;