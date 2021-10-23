import {Link} from 'react-router-dom';

const Landing = () => {

    return (
        <>
            <h1>Landing</h1>
            <p>
                Login? <Link to="/login">Log In</Link>
            </p>
            <p>
                Signin? <Link to="/signup">Sign In</Link>
            </p>
        </>
    )
}

export default Landing;
