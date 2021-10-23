import React from 'react';
import {Link} from 'react-router-dom';

const DashboardNavigation = () => {

    return (
        <>
            <p><Link to="/">Start</Link></p>
            <p><Link to="/login">Login</Link></p>
            <p><Link to="/signup">Signup</Link></p>
            <p><Link to="/dashboard">Dashboard</Link></p>
        </>
    )
};

export default DashboardNavigation;
