import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";
import {RouteLoadingIndicator} from "./RouteLoadingIndicator";


export const AdminRoute = ({children}) => {
    const {user, profile, evaluatingUser} = useAppContext();
    let routeName = children.type.name;

    console.log("Evaluating user - admin route: ", evaluatingUser);

    if (evaluatingUser) {
        return <RouteLoadingIndicator text={"Evaluating admin route: " + routeName}/>;
    }
    return user && user.id && profile.role >= 1 ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
