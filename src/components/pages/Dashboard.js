import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import Sidebar from "../dashboardComponents/Sidebar";
import {ChevronDoubleRightIcon} from '@heroicons/react/solid';
import {Tab} from "react-bootstrap";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Tab.Container id="dashboard-tabs" defaultActiveKey="my-collection">
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

                            <Tab.Pane eventKey="my-collection">
                                <h2>{LABELS_AND_HEADINGS.MY_COLLECTION}</h2>
                                <p className="lead mb-5">
                                    Accessibility is the practice of making your websites usable by as many people as possible.
                                    We traditionally think of this as being about people with disabilities, but the practice of making sites accessible also
                                    benefits other groups such as those using mobile devices, or those with slow network connections.
                                </p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="something-else">
                                <h2>sumthin else</h2>
                                <p className="lead mb-5">
                                    Accessibility and accessibility is the practice of making your websites usable by as many people as possible.
                                    We traditionally think of this as being about people with disabilities, but the practice of making sites accessible also
                                    benefits other groups such as those using mobile devices, or those with slow network connections.
                                </p>
                            </Tab.Pane>






                        </Tab.Content>


                    </div>
                </div>
            </main>
        </Tab.Container>
    )
}

export default Dashboard;
