import {Redirect, Route} from 'react-router-dom';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import React from 'react';
import {useAppContext} from '../context/AppContext';
import Settings from './pages/Settings';
import SignupSuccess from './pages/SignUpSuccess';
import Admin from './pages/Admin';

const Routes = () => {
    const {user, role} = useAppContext();
    // Conditional rendering - must have user and role
    return (
        <>
            <Route exact path='/' component={Start}/>
            <Route path='/success' component={SignupSuccess}/>
            <Route exact path='/dashboard'> {!user ? <Redirect to='/'/> : <Dashboard/>}</Route>
            <Route path='/dashboard/settings'> {!user ? <Redirect to='/'/> : <Settings/>}</Route>
            <Route path='/dashboard/admin'> {(!user && role !== 1) ? <Redirect to='/'/> : <Admin/>}</Route>
        </>
    )
}

export default Routes;
