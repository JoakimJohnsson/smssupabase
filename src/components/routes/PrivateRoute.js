import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";
import {RouteLoadingIndicator} from "./RouteLoadingIndicator";


export const PrivateRoute = ({children}) => {
    const {user, evaluatingUser} = useAppContext();
    let routeName = children.type.name;

    console.log("Evaluating user - private route: ", evaluatingUser);

    if (evaluatingUser) {
        return <RouteLoadingIndicator text={"Evaluating private route:" + routeName}/>;
    }
    return user && user.id ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
