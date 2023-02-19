import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import Login from "../Login";


export const HomePublic = () => {

    return (
        <>
            <HeroHeader/>
            <main className={"container-fluid p-5"}>
                <div className={"row justify-content-center pb-5 mb-5"}>
                    <div className={"col-12 col-md-6 d-flex flex-column"}>
                        <div className={"align-self-center d-flex align-items-center flex-column"}>
                            <h2 className={"fs-1 m-0"} id={"login-section"}>{LABELS_AND_HEADINGS.LOG_IN}</h2>
                        </div>
                        <Login/>
                        <div className={"align-self-center d-flex align-items-center flex-column"}>
                            <h2 className={"fs-1 m-0"} id={"create-account-section"}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                        </div>
                        <Signup/>
                    </div>
                </div>
            </main>
        </>
    )
}
