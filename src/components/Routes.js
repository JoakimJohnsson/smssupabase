import {Redirect, Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import React from "react";
import {useAuth} from "../contexts/Auth";
import Settings from "./pages/Settings";

const Routes = () => {

    const {user} = useAuth();

    return (
        <>
            <Route exact path="/" component={Landing}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route exact path="/dashboard"> {!user ? <Redirect to="/login"/> : <Dashboard/>}</Route>
            <Route path="/dashboard/settings"> {!user ? <Redirect to="/login"/> : <Settings/>}</Route>
        </>
    )
}

export default Routes;
