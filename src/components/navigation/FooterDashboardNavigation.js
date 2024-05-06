import React from "react";
import {ROUTES} from "../../helpers/constants/configConstants";
import {PANES} from "../../helpers/constants/textConstants/texts";
import {
    Icon,
    collectionsIconDuoTone,
    overviewIconDuoTone,
    titlesIconDuoTone,
    valueIconDuoTone, mapsIconDuoTone, moreIconDuoTone
} from "../icons";
import {Nav, NavDropdown} from "react-bootstrap";
import {FooterDashboardNavLink} from "./FooterDashboardNavLink";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


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
                <div className={"d-none d-md-flex"}>
                    <FooterDashboardNavLink route={ROUTES.DASHBOARD.COLLECTIONS} text={PANES.COLLECTIONS.NAME} variant={"country"}
                                            icon={<Icon icon={collectionsIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                    <FooterDashboardNavLink route={ROUTES.DASHBOARD.MAPS} text={PANES.MAPS.NAME} variant={"info"}
                                            icon={<Icon icon={mapsIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                </div>
                <NavDropdown
                    className={"d-inline-block d-md-none"}
                    title={
                        <div className={"d-flex flex-column align-items-center justify-content-center w-100"}>
                            <Icon icon={moreIconDuoTone} size={"2x"} className={"m-0"}/>
                            <span className={"footer-navlink-text"}>{LABELS.COMMON.MORE_CONTENT}</span>
                        </div>
                    }
                    id="nav-dropdown"
                    drop={"up-centered"}>
                    <NavDropdown.Item eventKey="123123">
                        <FooterDashboardNavLink route={ROUTES.DASHBOARD.COLLECTIONS} text={PANES.COLLECTIONS.NAME}
                                                variant={"country"}
                                                icon={<Icon icon={collectionsIconDuoTone} size={"2x"}
                                                            className={"m-0"}/>}/>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="1234234">
                        <FooterDashboardNavLink route={ROUTES.DASHBOARD.MAPS} text={PANES.MAPS.NAME} variant={"info"}
                                                icon={<Icon icon={mapsIconDuoTone} size={"2x"} className={"m-0"}/>}/>
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </footer>
    )
};
