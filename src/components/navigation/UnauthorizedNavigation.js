import React from 'react';
import {Link} from 'react-router-dom';

const UnauthorizedNavigation = () => {

    return (
        <>
            <h2>UnauthorizedNavigation</h2>
            <p><Link to="/">Start</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/signup">Signup</Link></p>
        </>
    )
};

export default UnauthorizedNavigation;
