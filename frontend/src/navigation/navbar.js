import styles from './navbar.module.css';

function Navbar() {
  return (
    <div className={ styles.navbar }>
        <nav>
            <a href="/login" className='text-blue-700'>
                <i className="fa-solid fa-right-to-bracket"></i>Login
            </a>
            <a href="/exercise-list">
                <i className="fa-solid fa-dumbbell"></i>All exercises
            </a>
        </nav>
    </div>
  );
}

export default Navbar;