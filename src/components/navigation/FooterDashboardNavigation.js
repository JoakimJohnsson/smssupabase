import React from "react";
import {PANES, ROUTES} from "../../helpers/constants";
import {OtherCollectionsIconDuoTone, OverviewIconDuoTone, TitlesIconDuoTone, ValueIconDuoTone} from "../icons-duotone";
import {Nav} from "react-bootstrap";
import {FooterDashboardNavLink} from "./FooterDashboardNavLink";


export const FooterDashboardNavigation = () => {
    return (
        <footer className="dashboard-footer">
            <Nav className={"w-100 d-flex justify-content-center py-3 py-sm-4"}>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.OVERVIEW} text={PANES.OVERVIEW.NAME} variant={"primary"}
                                        icon={<OverviewIconDuoTone size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.MY_TITLES} text={PANES.TITLES.NAME} variant={"primary"}
                                        icon={<TitlesIconDuoTone size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.VALUATION} text={PANES.VALUATION.NAME} variant={"primary"}
                                        icon={<ValueIconDuoTone size={"2x"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.OTHER_COLLECTIONS} text={PANES.OTHER_COLLECTIONS.NAME} variant={"info"}
                                        icon={<OtherCollectionsIconDuoTone size={"2x"}/>}/>
            </Nav>
        </footer>
    )
};
