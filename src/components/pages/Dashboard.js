import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Sidebar} from "../dashboard/Sidebar";
import {faChevronsRight, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import {useAppContext} from "../../context/AppContext";


export const Dashboard = () => {

    const {user} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const btnClass = isOpen ? "sidebar-btn open" : "sidebar-btn";

    return user ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <Sidebar isOpen={isOpen} handleClick={handleClick}/>
                    <div className={"p-0 d-block d-sm-none "}>
                        <button
                            className={btnClass}
                            onClick={handleClick}
                            aria-label={LABELS_AND_HEADINGS.MENU}
                            aria-controls={"sidebar-menu"}
                        >
                            <Icon icon={isOpen ? faTimes : faChevronsRight} className={"sms-icon--hovering me-0"}/>
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
                                <h2 className={"fs-1 mb-4"} id={"create-account-section"}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </main>
            </>
        )
}
