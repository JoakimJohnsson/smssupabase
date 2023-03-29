import React from "react";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";


export const HomePublic = () => {

    return (
        <>
            <HeroHeader/>
            <main className={"container-fluid p-5"}>
                <div className={"row justify-content-center pb-5 mb-5"}>
                    <div className={"col-12 col-md-6 d-flex flex-column"}>
                        <Login/>
                        <Signup/>
                        <ForgotPassword/>
                    </div>
                </div>
            </main>
        </>
    )
}
