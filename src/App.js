import './index.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import {AuthProvider} from './contexts/Auth'

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
*/

const App = () => {


    return (
        <div>
            <h1>supabase-auth-react</h1>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App;