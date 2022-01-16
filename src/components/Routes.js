import {Redirect, Route} from 'react-router-dom';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import React, {useEffect, useState} from 'react';
import {useAppContext} from '../context/AppContext';
import Settings from './pages/Settings';
import SignupSuccess from './pages/SignUpSuccess';
import Admin from './pages/Admin';
import {getRole} from '../helpers/functions';

const Routes = () => {

    const [role, setRole] = useState(0);
    const {user} = useAppContext();

    useEffect(() => {
        getRole(user, setRole).then(() => 'Do something!')
    }, [user])

    return (
        <>
            <Route exact path='/' component={Start}/>
            <Route path='/success' component={SignupSuccess}/>
            <Route exact path='/dashboard'> {!user ? <Redirect to='/'/> : <Dashboard/>}</Route>
            <Route path='/dashboard/settings'> {!user ? <Redirect to='/'/> : <Settings/>}</Route>
            <Route path='/dashboard/admin'> {!(user && role === 1) ? <Redirect to='/'/> : <Admin/>}</Route>
        </>
    )
}

export default Routes;
