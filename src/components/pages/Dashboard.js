import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Sidebar} from "../dashboard/Sidebar";
import {ChevronDoubleDownIcon, ChevronDoubleRightIcon} from "@heroicons/react/solid";
import {useAppContext} from "../../context/AppContext";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";


export const Dashboard = () => {

    const {user} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return user ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <Sidebar isOpen={isOpen} handleClick={handleClick}/>
                    <div className={"p-0 d-block d-md-none "}>
                        <button
                            className={"btn btn-sm btn-primary rounded-0 rounded-end mb-3 mt-3 text-start"}
                            onClick={handleClick}
                            aria-label={LABELS_AND_HEADINGS.MENU}
                            aria-controls={"sidebar-menu"}
                        >
                            <ChevronDoubleRightIcon className={"sms-icon--hovering me-0"}/>
                        </button>
                    </div>
                    <div className={"col row-padding--main"}>
                        <Outlet/>
                    </div>
                </div>
            </main>
        )
        :
        (
            <>
                <HeroHeader/>
                <main className={"container-fluid p-5"}>
                    <div className={"row justify-content-center pb-5 mb-5"}>
                        <div className={"col-12 col-md-6 d-flex flex-column"}>
                            <div className={"align-self-center mb-4 d-flex align-items-center flex-column"}>
                                <h2 className={"fs-1 text-secondary mb-4"} id={"create-account-section"}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                                <ChevronDoubleDownIcon className="sms-icon--large text-info"/>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </main>
            </>
        )
}
