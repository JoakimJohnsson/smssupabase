import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";


export const PrivateRoute = ({children}) => {
    const {user} = useAppContext();
    return user && user.id ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
