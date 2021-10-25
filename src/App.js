import './assets/css/index.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from './contexts/Auth'
import Navigation from "./components/navigation/Navigation";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
https://heroicons.com/ - icon library
https://github.com/tailwindlabs/heroicons- icon library usage
import { BeakerIcon } from '@heroicons/react/{solid/outline}}'; <BeakerIcon className="h-16 w-16 text-blue-900"/>
*/

const App = () => {

    return (
        <AuthProvider>
            <Router>
                <Navigation/>
                <Routes/>
                <Footer/>
            </Router>
        </AuthProvider>
    )
}

export default App;
