import React from "react";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../helpers/constants/configConstants";
import {useAppContext} from "../../context/AppContext";
import {NoMatch} from "./NoMatch";


export const CatchAll = () => {
    const {user} = useAppContext();
    if (!user) {
        return <Navigate replace to={ROUTES.DEFAULT}/>;
    }
    // User is logged in but the path did not match any route
    return <NoMatch/>;
}
