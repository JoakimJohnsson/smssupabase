import React, {useState} from "react";
import {LABELS_AND_HEADINGS, PANES} from "../../helpers/constants";
import Sidebar from "../dashboardComponents/Sidebar";
import {ChevronDoubleRightIcon} from '@heroicons/react/solid';
import {Tab} from "react-bootstrap";
import TitlesPane from "../dashboardComponents/dashboardTabPanes/TitlesPane";
import OtherCollectionsPane from "../dashboardComponents/dashboardTabPanes/OtherCollectionsPane";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Tab.Container id="dashboard-tabs" defaultActiveKey={PANES.P_TITLES.KEY}>
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <Sidebar isOpen={isOpen} handleClick={handleClick}/>
                    <div className={'col-12 d-block d-md-none '}>
                        <button className={'btn btn-link mb-3 text-start ps-0'} onClick={handleClick}>
                            <ChevronDoubleRightIcon className={'sms-icon--hamburger me-0'}/>
                        </button>
                    </div>
                    <div className={"col main-col"}>
                        <h1>{LABELS_AND_HEADINGS.DASHBOARD}</h1>
                        <Tab.Content>
                            <TitlesPane/>
                            <OtherCollectionsPane/>
                        </Tab.Content>
                    </div>
                </div>
            </main>
        </Tab.Container>
    )
}

export default Dashboard;
