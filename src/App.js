import './assets/css/main.css';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AppContextProvider} from './contexts/AppContext'
import Routes from "./components/Routes";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
https://heroicons.com/ - icon library
https://github.com/tailwindlabs/heroicons- icon library usage
import { BeakerIcon } from '@heroicons/react/{solid/outline}}'; <BeakerIcon className="h-16 w-16 text-blue-900"/>
https://github.com/validatorjs/validator.js
*/

const App = () => {

    return (
        <AppContextProvider>
            <Router>
                <Header/>
                <Routes/>
                <Footer/>
            </Router>
        </AppContextProvider>
    )
}

export default App;
