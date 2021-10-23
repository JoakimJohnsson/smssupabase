import './index.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from './contexts/Auth'
import Navigation from "./components/Navigation";
import Routes from "./components/Routes";

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
*/

const App = () => {

    return (
        <AuthProvider>
            <Router>
                <Navigation/>
                <Routes/>
            </Router>
        </AuthProvider>
    )
}

export default App;
