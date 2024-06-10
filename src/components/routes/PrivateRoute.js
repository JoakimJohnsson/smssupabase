import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const PrivateRoute = ({children}) => {
    const {user, evaluatingUser} = useAppContext();
    if (evaluatingUser) {
        return <OverlaySpinner/>;
    }
    return user && user.id ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
