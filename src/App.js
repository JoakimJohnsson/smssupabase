import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AppContextProvider} from "./context/AppContext"
import {MyRoutes} from "./components/MyRoutes";
import {Header} from "./components/header/Header";
import Footer from "./components/Footer";


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
