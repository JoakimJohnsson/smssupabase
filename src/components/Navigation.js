import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {


    return (
        <>

            <p><Link to="/">Start</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/signup">Signup</Link></p>
            <p><Link to="/dashboard">Dashboard</Link></p>



        </>

    )
};

export default Navigation;
