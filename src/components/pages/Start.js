import Signup from "../Signup";
import {CollectionIcon, ClipboardListIcon, BadgeCheckIcon, ChevronDoubleDownIcon} from "@heroicons/react/solid";
import React from "react";
import Login from "../Login";

const Start = () => {

    return (
        <>
            <div className={"bg-gradient-to-br from-blue-1000 via-blue-800 to-blue-900 bg-black"}>
                <div className={"grid grid-cols-1 md:grid-cols-2"}>
                    <div className={"p-10 sm:p-20"}>
                        <Login/>
                    </div>
                    <div className={"p-10 sm:p-20 flex justify-center flex-col"}>
                        <h1 className={"font-bold mb-10 text-white text-4xl sm:text-5xl text-center"}>Welcome to Svenska Marvelsamlare!</h1>
                        <p className={"mb-8 w-2/3 text-white text-center mx-auto"}>Do you collect swedish marvel comics?</p>
                        <ul className={"text-center text-lg"}>
                            <li className={"text-yellow-400 mb-4"}><BadgeCheckIcon className="h-7 w-7 mb-1 inline mr-1"/>Manage and keep track of your
                                comics collection
                            </li>
                            <li className={"text-yellow-300 mb-4"}><CollectionIcon className="h-7 w-7 mb-1 inline mr-1"/>New titles added continuously
                            </li>
                            <li className={"text-yellow-100"}><ClipboardListIcon className="h-7 w-7 mb-1 inline mr-1"/>Always have your notes ready in
                                the
                                palm of your hand
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className={"flex justify-center flex-col text-blue-900"}>

                <h2 className={"font-bold mb-5 text-4xl sm:text-5xl"}>Sign up</h2>
                <ChevronDoubleDownIcon className="h-20 w-20 mb-1 inline mr-1"/>

            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div className={"order-last md:order-first"}>
                    <div className={"p-10 flex justify-center flex-col"}>
                        <Signup/>
                    </div>
                </div>
                <div className={"order-last md:order-first"}>
                    <div className={"p-10 flex justify-center flex-col"}>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Start;
