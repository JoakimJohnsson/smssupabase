import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Sidebar} from "../dashboard/Sidebar";
import {faChevronsRight} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";


export const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <main className={"container-fluid main-container dashboard"}>
            <div className={"row"}>
                <Sidebar isOpen={isOpen} handleClick={handleClick}/>
                <div className={"p-0 d-block d-md-none "}>
                    <button
                        className={"btn btn-sm btn-primary sms-icon-btn rounded-0 rounded-end mb-3 mt-3 ms-0 p-2 text-start"}
                        onClick={handleClick}
                        aria-label={LABELS_AND_HEADINGS.MENU}
                        aria-controls={"sidebar-menu"}
                    >
                        <Icon icon={faChevronsRight} className={"sms-icon--hovering me-0"}/>
                    </button>
                </div>
                <div className={"col row-padding--main"}>
                    <Outlet/>
                </div>
            </div>
        </main>
    )
}
