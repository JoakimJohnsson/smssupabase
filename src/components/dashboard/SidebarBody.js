import React from "react";
import {LABELS_AND_HEADINGS, PANES, ROUTES} from "../../helpers/constants";
import {Nav} from "react-bootstrap";
import {SidebarNavLink} from "./SidebarNavLink";
import {OtherCollectionsIconDuoTone, OverviewIconDuoTone, TitlesIconDuoTone, ValueIconDuoTone} from "../icons-duotone";


export const SidebarBody = ({handleClick}) => {
    return (
        <>
            <Nav className={"w-100 d-block pt-3 pt-sm-5"}>
                <div className={"mb-4"}>
                    <p className={"sidebar-label"}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>
                    <SidebarNavLink route={ROUTES.DASHBOARD.OVERVIEW} handleClick={handleClick} text={PANES.OVERVIEW.NAME} variant={"primary"}
                                    icon={<OverviewIconDuoTone size={"2x"}/>}/>
                    <SidebarNavLink route={ROUTES.DASHBOARD.TITLES} handleClick={handleClick} text={PANES.TITLES.NAME} variant={"primary"}
                                    icon={<TitlesIconDuoTone size={"2x"}/>}/>
                    <SidebarNavLink route={ROUTES.DASHBOARD.VALUATION} handleClick={handleClick} text={PANES.VALUATION.NAME} variant={"primary"}
                                    icon={<ValueIconDuoTone size={"2x"}/>}/>
                </div>
                <div>
                    <p className={"sidebar-label"}>{LABELS_AND_HEADINGS.COMMUNITY}</p>
                    <SidebarNavLink route={ROUTES.DASHBOARD.OTHER_COLLECTIONS} handleClick={handleClick} text={PANES.OTHER_COLLECTIONS.NAME} variant={"info"}
                                    icon={<OtherCollectionsIconDuoTone size={"2x"}/>}/>
                </div>
            </Nav>
        </>
    )
}
