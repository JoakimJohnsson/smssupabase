import Signup from "../Signup";
import {CollectionIcon, ClipboardListIcon, BadgeCheckIcon} from "@heroicons/react/solid";
import React from "react";

const Start = () => {

    return (
        <div className={"grid grid-cols-2"}>
            <div className={""}>
                <div className={"p-10 flex justify-center flex-col"}>
                    <Signup/>
                </div>
            </div>
            <div className={"bg-gradient-to-br from-blue-1000 via-blue-800 to-blue-900 bg-black"}>
                <div className={"p-20 flex justify-center flex-col"}>
                    <h1 className={"font-bold mb-10 text-white text-5xl text-center"}>Welcome to Svenska Marvelsamlare!</h1>
                    <p className={"mb-8 w-2/3 text-white text-center mx-auto"}>Do you collect swedish marvel comics?</p>
                    <ul className={"text-center text-lg"}>
                        <li className={"text-yellow-400 mb-4"}><BadgeCheckIcon className="h-7 w-7 mb-1 inline mr-1"/>Manage and keep track of your
                            comics collection
                        </li>
                        <li className={"text-yellow-300 mb-4"}><CollectionIcon className="h-7 w-7 mb-1 inline mr-1"/>New titles added continuously
                        </li>
                        <li className={"text-yellow-100"}><ClipboardListIcon className="h-7 w-7 mb-1 inline mr-1"/>Always have your notes ready in the
                            palm of your hand
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Start;
