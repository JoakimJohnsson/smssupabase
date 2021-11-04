import {Redirect, Route} from "react-router-dom";
import Start from "./pages/Start";
import Dashboard from "./pages/Dashboard";
import React from "react";
import {useAuth} from "../contexts/Auth";
import Settings from "./pages/Settings";
import SignupSuccess from "./pages/SignUpSuccess";

const Routes = () => {

    const {user} = useAuth();

    return (
        <>
            <Route exact path="/" component={Start}/>
            <Route path="/success" component={SignupSuccess}/>
            <Route exact path="/dashboard"> {!user ? <Redirect to="/login"/> : <Dashboard/>}</Route>
            <Route path="/dashboard/settings"> {!user ? <Redirect to="/login"/> : <Settings/>}</Route>
        </>
    )
}

export default Routes;
