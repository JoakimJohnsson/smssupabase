import React from "react";
import {Signup} from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Information from "./Information";
import {HeroHeader} from "../../header/HeroHeader.jsx";


export const HomePublic = () => {

    return (
        <>
            <HeroHeader/>
            <div className={"d-flex justify-content-center pb-5"}>
                <div className={"col-12 col-md-10 col-xl-6 d-flex flex-column"}>
                    <Login/>
                    <Signup/>
                    <ForgotPassword/>
                    <Information/>
                </div>
            </div>
        </>
    )
}
