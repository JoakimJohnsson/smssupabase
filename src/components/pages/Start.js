import Signup from "../Signup";
import {CollectionIcon, ClipboardListIcon, BadgeCheckIcon, ChevronDoubleDownIcon} from "@heroicons/react/solid";
import React from "react";
import Login from "../Login";
import {useAuth} from "../../contexts/Auth";

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
            <div className={"container-fluid p-3"}>
                <div className={"row"}>
                    <div className={"col-12 col-md-6"}>
                        <div className={""}>
                            <Login/>
                        </div>
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <h1 className={"text-primary"}>
                            Welcome to Svenska Marvelsamlare!
                        </h1>
                        <p className={""}>Do you collect swedish marvel comics?</p>
                        <ul className={"list-unstyled"}>
                            <li className={""}><BadgeCheckIcon className="sms-icon--large me-3"/>
                                Manage and keep track of your comics collection
                            </li>
                            <li className={""}><CollectionIcon className="sms-icon--large me-3"/>
                                New titles added continuously
                            </li>
                            <li className={""}><ClipboardListIcon className="sms-icon--large me-3"/>
                                Always have your notes ready in the palm of your hand
                            </li>
                        </ul>
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <div className={""}>
                            <h2 className={""}>Register here!</h2>
                            <ChevronDoubleDownIcon className="sms-icon--large"/>
                        </div>
                    </div>
                    <div className={"col-12 col-md-6"}>
                        <div className={""}>
                            <div className={""}>
                                <Signup/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
}

export default Start;
