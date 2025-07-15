import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {AppContextProvider} from "./context/AppContext"
import {MyRoutes} from "./components/routes/MyRoutes";
import {Header} from "./components/header/Header";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer.jsx";


export const App = () => {

    return (
        <AppContextProvider>
            <Router>
                <Header/>
                <main id="main-content" className={"main-container"}>
                    <div className={"main-container__row"}>
                        <MyRoutes/>
                    </div>
                    <ScrollToTopButton/>
                </main>
                <Footer/>
            </Router>
        </AppContextProvider>
    )
}
