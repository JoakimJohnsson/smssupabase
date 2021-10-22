import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import {AuthProvider} from './contexts/Auth'
import Landing from "./components/pages/Landing";
import Navigation from "./components/Navigation";

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
*/

const App = () => {


    return (
        <div>
            <h1>supabase-auth-react</h1>
            <Router>
                <AuthProvider>
                    <Navigation/>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard}/>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App;