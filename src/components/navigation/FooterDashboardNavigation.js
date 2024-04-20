import React from "react";
import {ROUTES} from "../../helpers/constants/configConstants";
import {PANES} from "../../helpers/constants/textConstants/texts";
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
            <Nav className={"w-100 d-flex justify-content-center py-2 py-lg-3"}>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.OVERVIEW} text={PANES.OVERVIEW.NAME} variant={"primary"}
                                        icon={<Icon icon={overviewIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.MY_TITLES} text={PANES.TITLES.NAME} variant={"primary"}
                                        icon={<Icon icon={titlesIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.VALUATION} text={PANES.VALUATION.NAME} variant={"grade"}
                                        icon={<Icon icon={valueIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                <FooterDashboardNavLink route={ROUTES.DASHBOARD.COLLECTIONS} text={PANES.COLLECTIONS.NAME} variant={"country"}
                                        icon={<Icon icon={otherCollectionsIconDuoTone} size={"2x"} className={"m-0"}/>}/>
            </Nav>
        </footer>
    )
};
