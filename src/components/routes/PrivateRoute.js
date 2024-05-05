import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";
import {RouteLoadingIndicator} from "./RouteLoadingIndicator";


export const PrivateRoute = ({children}) => {
    const {user, evaluatingUser} = useAppContext();
    if (evaluatingUser) {
        return <RouteLoadingIndicator/>;
    }
    return user && user.id ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
