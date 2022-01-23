import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import Sidebar from "../dashboardComponents/Sidebar";
import {ChevronDoubleRightIcon} from '@heroicons/react/solid';

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <main className={"container-fluid main-container dashboard"}>
            <div className={"row"}>
                <Sidebar isOpen={isOpen} handleClick={handleClick}/>

                <div className={"col main-col"}>
                    <button className={'btn btn-outline-secondary d-inline-block d-flex d-md-none mb-3'} onClick={handleClick}>
                        <ChevronDoubleRightIcon className={'sms-icon--text me-0'}/>
                    </button>
                    <h1>{LABELS_AND_HEADINGS.DASHBOARD}</h1>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;
