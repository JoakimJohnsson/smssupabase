import React from "react";
import {UserGroupIcon, PresentationChartBarIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS, PANES, ROUTES} from "../../helpers/constants";
import {Nav} from "react-bootstrap";
import {SidebarNavLink} from "./SidebarNavLink";
import {TitlesIcon} from "../icons";


export const SidebarBody = ({handleClick}) => {
    return (
        <>
            <Nav className={'w-100 d-block pt-3 pt-md-5'}>
                <div className={'mb-4'}>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>
                    <SidebarNavLink route={ROUTES.DASHBOARD.OVERVIEW} handleClick={handleClick} text={PANES.OVERVIEW.NAME} variant={"primary"}
                                    icon={<PresentationChartBarIcon className={'sms-icon--text-md'}/>}/>
                    <SidebarNavLink route={ROUTES.DASHBOARD.TITLES} handleClick={handleClick} text={PANES.TITLES.NAME} variant={"primary"}
                                    icon={<TitlesIcon textVariant={"md"}/>}/>
                </div>
                <div>
                    <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.COMMUNITY}</p>
                    <SidebarNavLink route={ROUTES.DASHBOARD.OTHER_COLLECTIONS} handleClick={handleClick} text={PANES.OTHER_COLLECTIONS.NAME} variant={"secondary"}
                                    icon={<UserGroupIcon className={'sms-icon--text-md'}/>}/>
                </div>
            </Nav>
        </>
    )
}
