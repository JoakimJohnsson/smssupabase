import React from "react";
import {Navigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {ROUTES} from "../../helpers/constants/configConstants";


export const AdminRoute = ({children}) => {
    const {user, profile} = useAppContext();
    return user && user.id && profile.role >= 1 ? <>{children}</> : <Navigate to={ROUTES.DEFAULT}/>;
};
