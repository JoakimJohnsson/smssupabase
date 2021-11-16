import Signup from "../signup/Signup";
import {ChevronDoubleDownIcon} from "@heroicons/react/solid";
import React from "react";
import {useAuth} from "../../contexts/Auth";
import HeroHeader from "../header/HeroHeader";

const Start = () => {

    const {user} = useAuth();

    return user ? (
            <div className={"container-fluid p-3"}>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <h1 className={""}>
                            You are now logged in
                        </h1>
                    </div>
                </div>
            </div>
        )
        :
        (
            <>
                <HeroHeader/>
                <div className={"container-fluid p-5"}>
                    <div className={"row justify-content-center pb-5 mb-5"}>
                        <div className={"col-12 col-md-6 d-flex flex-column"}>
                            <div className={"align-self-center mb-4 d-flex align-items-center flex-column"}>
                                <h2 className={"fs-1 text-secondary mb-4"} id={"create-account-section"}>Create account</h2>
                                <ChevronDoubleDownIcon className="sms-icon--large text-info"/>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Start;
