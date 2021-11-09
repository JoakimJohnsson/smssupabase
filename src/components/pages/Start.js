import Signup from "../Signup";
import {CollectionIcon, ClipboardListIcon, BadgeCheckIcon, ChevronDoubleDownIcon} from "@heroicons/react/solid";
import React from "react";
import Login from "../Login";
import {useAuth} from "../../contexts/Auth";
import HeroHeader from "../header/HeroHeader";

const Start = () => {

    const {user} = useAuth();

    return user ?
        (
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
                <div className={"container-fluid p-3"}>

                    <div className={"row"}>
                        <div className={"col-12 text-center"}>
                            <div className={""}>
                                <h2 className={""}>Register here!</h2>
                                <ChevronDoubleDownIcon className="sms-icon--large"/>
                                <Signup/>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        )
}

export default Start;
