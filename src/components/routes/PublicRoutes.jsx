import {Route, Routes} from "react-router-dom";
import React from "react";
import {ROUTES} from "../../helpers/constants/configConstants";
import {Home} from "../pages/home/Home";
import SignupSuccess from "../pages/SignUpSuccess";
import ChangePassword from "../pages/ChangePassword";
import {CatchAll} from "./CatchAll";


export const PublicRoutes = () => {
    return (
        <Routes>
            <Route exact path={ROUTES.DEFAULT} element={<Home/>}/>
            <Route path={ROUTES.SUCCESS} element={<SignupSuccess/>}/>
            <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword/>}/>
            <Route path={"*"} element={<CatchAll method={"Catch all"}/>}/>
        </Routes>
    )
}