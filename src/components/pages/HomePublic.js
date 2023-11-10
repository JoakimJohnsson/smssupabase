import React from "react";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import Information from "../Information";


export const HomePublic = () => {

    return (
        <>
            <HeroHeader/>
            <main id="main-content" className={"container-fluid p-5"}>
                <div className={"row justify-content-center pb-5"}>
                    <div className={"col-12 col-md-10 col-xl-6 d-flex flex-column col-x-padding--xs-only"}>
                        <Login/>
                        <Signup/>
                        <ForgotPassword/>
                        <Information/>
                    </div>
                </div>
            </main>
        </>
    )
}
