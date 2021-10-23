import React from 'react';
import {Link} from 'react-router-dom';

const AuthorizedNavigation = () => {

    return (
        <>
            <h2>AuthorizedNavigation</h2>
            <p><Link to="/">Start</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/signup">Signup</Link></p>
            <p><Link to="/dashboard">Dashboard</Link></p>
        </>
    )
};

export default AuthorizedNavigation;
