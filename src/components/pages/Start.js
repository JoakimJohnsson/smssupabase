import Signup from "../Signup";
import {CollectionIcon, ClipboardListIcon, BadgeCheckIcon, ChevronDoubleDownIcon} from "@heroicons/react/solid";
import React from "react";
import Login from "../Login";
import {useAuth} from "../../contexts/Auth";

const Start = () => {

    const {user} = useAuth();

    return user ?
        (<div className={""}>
            <div className={""}>

                <div className={""}>
                    <h1 className={""}>
                        You are now logged in
                    </h1>
                </div>
                <div className={""}>
                </div>
            </div>
        </div>)
        :
        (<>
            <div className={""}>
                <div className={""}>
                    <div className={""}>
                        <Login/>
                    </div>
                    <div className={""}>
                        <h1 className={""}>
                            Welcome to Svenska Marvelsamlare!
                        </h1>
                        <p className={""}>Do you collect swedish marvel comics?</p>
                        <ul className={""}>
                            <li className={""}><BadgeCheckIcon className=""/>
                                Manage and keep track of your comics collection
                            </li>
                            <li className={""}><CollectionIcon className=""/>
                                New titles added continuously
                            </li>
                            <li className={""}><ClipboardListIcon className=""/>
                                Always have your notes ready in the palm of your hand
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={""}>
                <div className={""}>
                    <h2 className={""}>Register here!</h2>
                    <ChevronDoubleDownIcon className=""/>
                </div>
            </div>
            <div className={""}>
                <div className={""}>
                    <div className={""}>
                        <Signup/>
                    </div>
                </div>
            </div>
        </>)
}

export default Start;
