import React from "react";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS, PANES} from "../../helpers/constants";
import {Nav} from "react-bootstrap";
import SidebarNavLink from "./SidebarNavLink";

const SidebarBody = () => {
    return (
        <>
            <Nav className={'w-100 d-block pt-3 pt-md-5'}>
                <div className={'mb-3'}>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>
                    <SidebarNavLink eventKey={PANES.P_TITLES.KEY} variant={'primary'} icon={<DocumentDuplicateIcon className={'sms-icon--text'}/>}
                                    text={PANES.P_TITLES.NAME}/>
                </div>
                <div className={''}>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.COMMUNITY}</p>
                    <SidebarNavLink eventKey={PANES.P_OTHER_COLLECTIONS.KEY} variant={'secondary'} icon={<DocumentDuplicateIcon className={'sms-icon--text'}/>}
                                    text={PANES.P_OTHER_COLLECTIONS.NAME}/>
                </div>
            </Nav>
        </>
    )
}

export default SidebarBody;
