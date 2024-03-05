import React from "react";
import {PANES, ROUTES} from "../../helpers/constants";
import {
    Icon,
    otherCollectionsIconDuoTone,
    overviewIconDuoTone,
    titlesIconDuoTone,
    valueIconDuoTone
} from "../icons";
import {Nav} from "react-bootstrap";
import {FooterDashboardNavLink} from "./FooterDashboardNavLink";


export const FooterDashboardNavigation = () => {
    return (
        <footer className="dashboard-footer">
            <Nav className={"w-100 d-flex justify-content-center py-3 py-lg-4"}>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.OVERVIEW} text={PANES.OVERVIEW.NAME} variant={"primary"}
                                        icon={<Icon icon={overviewIconDuoTone} size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.MY_TITLES} text={PANES.TITLES.NAME} variant={"primary"}
                                        icon={<Icon icon={titlesIconDuoTone} size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.VALUATION} text={PANES.VALUATION.NAME} variant={"grade"}
                                        icon={<Icon icon={valueIconDuoTone} size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.OTHER_COLLECTIONS} text={PANES.OTHER_COLLECTIONS.NAME} variant={"info"}
                                        icon={<Icon icon={otherCollectionsIconDuoTone} size={"2x"}/>}/>
            </Nav>
        </footer>
    )
};
