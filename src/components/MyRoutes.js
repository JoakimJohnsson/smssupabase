import {Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import React from 'react';
import {useAppContext} from '../context/AppContext';
import Settings from './pages/Settings';
import SignupSuccess from './pages/SignUpSuccess';
import Admin from './pages/Admin';
import {ROUTES} from '../helpers/constants';

const MyRoutes = () => {
    const {user, role} = useAppContext();
    // Conditional rendering - must have user and role
    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Dashboard/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
            <Route path={ROUTES.SETTINGS} element={ !user ? <Navigate replace to={ROUTES.DEFAULT}/> : <Settings/>   }/>
            <Route path={ROUTES.ADMIN} element={ (!user && role !== 1) ? <Navigate replace to={ROUTES.DEFAULT}/> : <Admin/>   }/>
        </Routes>
    )
}

export default MyRoutes;
