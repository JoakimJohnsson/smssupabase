import React, {useState} from "react";
import {LABELS_AND_HEADINGS, PANES} from "../../helpers/constants";
import {Sidebar} from "../dashboardComponents/Sidebar";
import {ChevronDoubleDownIcon, ChevronDoubleRightIcon} from '@heroicons/react/solid';
import {Tab} from "react-bootstrap";
import {TitlesPane} from "../dashboardComponents/dashboardTabPanes/TitlesPane";
import {OtherCollectionsPane} from "../dashboardComponents/dashboardTabPanes/OtherCollectionsPane";
import {OverviewPane} from "../dashboardComponents/dashboardTabPanes/OverviewPane";
import {useAppContext} from "../../context/AppContext";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";

export const Dashboard = () => {

    const {user} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen)
    }

 // https://thekenyandev.com/blog/building-a-react-router-sidebar-with-react/

    return user ? (
            <Tab.Container id="dashboard-tabs" defaultActiveKey={PANES.OVERVIEW.KEY}>
                <main className={"container-fluid main-container dashboard"}>
                    <div className={"row"}>
                        <Sidebar isOpen={isOpen} handleClick={handleClick}/>
                        <div className={'col-12 d-block d-md-none '}>
                            <button
                                className={'btn btn-link mb-3 mt-3 text-start'}
                                onClick={handleClick}
                                aria-label={LABELS_AND_HEADINGS.MENU}
                                aria-controls={'sidebar-menu'}
                            >
                                <ChevronDoubleRightIcon className={'sms-icon--hamburger me-0'}/>
                            </button>
                        </div>
                        <div className={"col main-col"}>
                            <Tab.Content>
                                <OverviewPane/>
                                <TitlesPane/>
                                <OtherCollectionsPane/>
                            </Tab.Content>
                        </div>
                    </div>
                </main>
            </Tab.Container>
        )
        :
        (
            <>
                <HeroHeader/>
                <main className={'container-fluid p-5'}>
                    <div className={'row justify-content-center pb-5 mb-5'}>
                        <div className={'col-12 col-md-6 d-flex flex-column'}>
                            <div className={'align-self-center mb-4 d-flex align-items-center flex-column'}>
                                <h2 className={'fs-1 text-secondary mb-4'} id={'create-account-section'}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                                <ChevronDoubleDownIcon className='sms-icon--large text-info'/>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </main>
            </>

        )
}
