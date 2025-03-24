import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {SignOutButton} from "../minis/SignOutButton";
import {useAppContext} from "../../context/AppContext";
import {NavbarProfileInformation} from "../NavbarProfileInformation";
import {LiNavItem} from "../lists/LiNavItem";
import {ROUTES} from "../../helpers/constants/configConstants";
import {faBars, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {
    Icon,
    adminIconDuoTone,
    issueIconDuoTone,
    marvelKlubbenIconDuoTone,
    publishersIconDuoTone,
    settingsIconDuoTone,
    startIconDuoTone,
    titlesIconDuoTone,
    usersIconDuoTone,
    valueIconDuoTone,
    moreIconDuoTone,
    overviewIconDuoTone,
    // Maps section temporarily disabled awaiting rework and Google Maps api fixes
    // mapsIconDuoTone,
    collectionsIconDuoTone,
    lessIconDuoTone,
} from "../icons";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavDropdownTitle} from "../minis/NavDropdownTitle";
import {BREADCRUMB_NAMES, LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {NavigationLogo} from "./NavigationLogo";
import {PANES} from "../../helpers/constants/textConstants/texts";


export const AuthorizedNavigation = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDropdown1Expanded, setIsDropdown1Expanded] = useState(false);
    const [isDropdown2Expanded, setIsDropdown2Expanded] = useState(false);
    const navbarRef = useRef(null);
    const {profile, showUserNotification, showAdminNotification, showAdminTodoNotification} = useAppContext();

    // Uses updated expanded states from different onToggle callbacks
    const handleToggle = (expanded) => {
        setIsExpanded(expanded);
    };

    const handleDropdown1Toggle = (expanded) => {
        setIsDropdown1Expanded(expanded);
        setIsDropdown2Expanded(false); // Close other dropdown
    };

    const handleDropdown2Toggle = (expanded) => {
        setIsDropdown2Expanded(expanded);
        setIsDropdown1Expanded(false); // Close other dropdown
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            closeEveryThing();
        }
    };

    const closeEveryThing = () => {
        setIsExpanded(false);
        setIsDropdown1Expanded(false);
        setIsDropdown2Expanded(false);
    }

    useEffect(() => {
        if (isExpanded || isDropdown1Expanded || isDropdown2Expanded) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded, isDropdown1Expanded, isDropdown2Expanded]);

    return profile && (
        <Navbar collapseOnSelect ref={navbarRef} expand="lg" variant={"dark"} expanded={isExpanded}
                onToggle={handleToggle}>
            <div className="container-fluid">
                <Navbar.Brand>
                    <NavigationLogo/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-auth-navbar-nav"
                               className={`btn sms-icon-btn d-block d-lg-none px-3 ${isExpanded ? "text-danger" : "text-primary"}`}>
                    <span className={"visually-hidden"}>{LABELS.COMMON.MENU}</span>
                    <Icon icon={isExpanded ? faTimes : faBars} className={"fa-2xl sms-icon--hovering"}/>
                </Navbar.Toggle>
                <Navbar.Collapse id="responsive-auth-navbar-nav" className="justify-content-end">
                    <Nav as="ul" className={"align-items-start"}>
                        <LiNavItem onClick={closeEveryThing} route={ROUTES.DEFAULT}
                                   icon={<Icon icon={startIconDuoTone} size={"2x"}/>}
                                   text={LABELS.COMMON.HOME}
                                   doShowNotification={showUserNotification} isUserNotification={true}/>
                        <NavDropdown as="li"
                            title={<NavDropdownTitle icon={isDropdown1Expanded ? lessIconDuoTone : moreIconDuoTone}
                                                     label={LABELS.SECTIONS.DASHBOARD.NAME}/>}
                            id="collapsible-nav-dropdown-content"
                            show={isDropdown1Expanded}
                            onToggle={handleDropdown1Toggle}>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing} exact={"true"} to={ROUTES.DASHBOARD.PATH_OVERVIEW}
                                         className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={overviewIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.OVERVIEW.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.DASHBOARD.PATH_MY_TITLES}
                                         className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={titlesIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.TITLES.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.DASHBOARD.PATH_MY_ISSUES}
                                         className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={issueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.ISSUES.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.DASHBOARD.PATH_VALUATION}
                                         className={"nav-link nav-link--dropdown text-grade"}>
                                    <Icon icon={valueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.VALUATION.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.DASHBOARD.PATH_COLLECTIONS}
                                         className={"nav-link nav-link--dropdown text-warning"}>
                                    <Icon icon={collectionsIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.COLLECTIONS.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            {/* Maps section temporarily disabled awaiting rework and Google Maps api fixes
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.DASHBOARD.PATH_MAP}
                                         className={"nav-link nav-link--dropdown text-country"}>
                                    <Icon icon={mapsIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.MAP.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            */}
                        </NavDropdown>
                        <NavDropdown as="li"
                            title={<NavDropdownTitle icon={isDropdown2Expanded ? lessIconDuoTone : moreIconDuoTone}
                                                     label={LABELS.COMMON.MORE_CONTENT}/>}
                            id="collapsible-auth-nav-dropdown-dashboard"
                            show={isDropdown2Expanded}
                            onToggle={handleDropdown2Toggle}>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.TITLES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={titlesIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.TITLES.ALL_TITLES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.ISSUES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={issueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.ISSUES.ALL_ISSUES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.GRADE_VALUES}
                                         className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={valueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.GRADES.GRADE_VALUES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.MARVELKLUBBEN}
                                         className={"nav-link nav-link--dropdown text-marvelklubben"}>
                                    <Icon icon={marvelKlubbenIconDuoTone} className={"me-2"}/>
                                    <span
                                        className={"sms-nav-link--text"}>{LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.PUBLISHERS}
                                         className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={publishersIconDuoTone} className={"me-2"}/>
                                    <span
                                        className={"sms-nav-link--text"}>{LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="p" className={"mb-0"}>
                                <NavLink onClick={closeEveryThing}  exact={"true"} to={ROUTES.USERS} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={usersIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.USERS.ALL_USERS}</span>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <LiNavItem onClick={closeEveryThing} route={ROUTES.PROFILE}
                                   icon={<Icon icon={settingsIconDuoTone} size={"2x"}/>} text={LABELS.COMMON.SETTINGS}/>
                        {
                            profile.role >= 1 &&
                            <LiNavItem onClick={closeEveryThing} route={ROUTES.ADMIN.ROOT}
                                       icon={<Icon icon={adminIconDuoTone} size={"2x"}/>} text={BREADCRUMB_NAMES.ADMIN}
                                       doShowNotification={showAdminNotification || showAdminTodoNotification}
                                       isAdminNotification={true}/>
                        }
                        <li className="nav-item">
                            <NavbarProfileInformation profile={profile}/>
                            <SignOutButton/>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
};
