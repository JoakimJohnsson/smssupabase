import React from "react";
import {DocumentDuplicateIcon, UserGroupIcon, PresentationChartBarIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS, PANES} from "../../helpers/constants";
import {Nav} from "react-bootstrap";
import SidebarNavLink from "./SidebarNavLink";

const SidebarBody = ({handleClick}) => {
    return (
        <>
            <Nav className={'w-100 d-block pt-3 pt-md-5'}>
                <div className={'mb-4'}>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>
                    <SidebarNavLink eventKey={PANES.OVERVIEW.KEY} variant={'primary'} Icon={<PresentationChartBarIcon className={'sms-icon--text'}/>}
                                    text={PANES.OVERVIEW.NAME} handleClick={handleClick}/>
                    <SidebarNavLink eventKey={PANES.TITLES.KEY} variant={'primary'} Icon={<DocumentDuplicateIcon className={'sms-icon--text'}/>}
                                    text={PANES.TITLES.NAME} handleClick={handleClick}/>
                </div>
                <div className={''}>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.COMMUNITY}</p>
                    <SidebarNavLink eventKey={PANES.OTHER_COLLECTIONS.KEY} variant={'secondary'} Icon={<UserGroupIcon className={'sms-icon--text'}/>}
                                    text={PANES.OTHER_COLLECTIONS.NAME} handleClick={handleClick}/>
                </div>
            </Nav>
        </>
    )
}

export default SidebarBody;
