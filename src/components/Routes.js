import {Redirect, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import React from 'react';
import {useAppContext} from '../context/AppContext';
import Settings from './pages/Settings';
import SignupSuccess from './pages/SignUpSuccess';
import Admin from './pages/Admin';
import {ROUTES} from '../helpers/constants';

const Routes = () => {
    const {user, role} = useAppContext();
    // Conditional rendering - must have user and role
    return (
        <>
            <Route exact path={ROUTES.DEFAULT} component={Dashboard}/>
            <Route path={ROUTES.SUCCESS} component={SignupSuccess}/>
            <Route path={ROUTES.SETTINGS}> {!user ? <Redirect to={ROUTES.DEFAULT}/> : <Settings/>}</Route>
            <Route path={ROUTES.ADMIN}> {(!user && role !== 1) ? <Redirect to={ROUTES.DEFAULT}/> : <Admin/>}</Route>
        </>
    )
}

export default Routes;
