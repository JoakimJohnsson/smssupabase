import {Redirect, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import React from "react";
import {useAuth} from "../contexts/Auth";

const Routes = () => {

    const {isAuthorized} = useAuth()

    return (
        <>
            <Route exact path="/"> {isAuthorized ? <Redirect to="/dashboard"/> : <Landing/>}</Route>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/dashboard"> {!isAuthorized ? <Redirect to="/login"/> : <Dashboard/>}</Route>
        </>
    )
}

export default Routes;
