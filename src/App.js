import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AppContextProvider} from "./context/AppContext"
import {MyRoutes} from "./components/MyRoutes";
import {Header} from "./components/header/Header";
import Footer from "./components/Footer";

/*
https://app.supabase.io/project/cxlyzmsjbvzlocvndmnw - login with GitHub.
https://heroicons.com/ - icon library
https://github.com/tailwindlabs/heroicons- icon library usage
import { BeakerIcon } from "@heroicons/react/{solid/outline}}"; <BeakerIcon className="h-16 w-16 text-blue-900"/>
https://github.com/validatorjs/validator.js
*/


export const App = () => {

    return (
        <AppContextProvider>
            <Router>
                <Header/>
                <MyRoutes/>
                <Footer/>
            </Router>
        </AppContextProvider>
    )
}
