import {Route, Routes} from "react-router-dom";
import React from "react";
import {useAppContext} from "../../context/AppContext";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {AuthenticatedRoutes} from "./AuthenticatedRoutes.jsx";
import {PublicRoutes} from "./PublicRoutes.jsx";


export const MyRoutes = () => {

    const {user, profile, evaluatingUser} = useAppContext();

    return (
        <Routes>
            <Route path="*" element={
                evaluatingUser ?
                    <OverlaySpinner/>
                    :
                    (user && profile) ?
                        <AuthenticatedRoutes/>
                        :
                        <PublicRoutes/>
            }/>
        </Routes>
    );
}
