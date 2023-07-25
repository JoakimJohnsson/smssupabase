import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Sidebar} from "../dashboard/Sidebar";
import {faChevronsRight, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";
import {useAppContext} from "../../context/AppContext";
import {HomePublic} from "./HomePublic";


export const Dashboard = () => {

    const {user} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const btnClass = isOpen ? "sidebar-btn open" : "sidebar-btn";

    return user ? (
            <main id="main-content" className={"container-fluid main-container dashboard"}>
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
        <HomePublic/>
}
