import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AppContextProvider} from "./context/AppContext"
import {MyRoutes} from "./components/routes/MyRoutes";
import {Header} from "./components/header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";


export const App = () => {

    return (
        <AppContextProvider>
            <Router>
                <Header/>
                <MyRoutes/>
                <ScrollToTopButton/>
            </Router>
        </AppContextProvider>
    )
}
