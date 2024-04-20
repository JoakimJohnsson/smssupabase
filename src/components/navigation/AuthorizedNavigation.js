import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {SignOutButton} from "../minis/SignOutButton";
import {useAppContext} from "../../context/AppContext";
import {NavbarProfileInformation} from "../NavbarProfileInformation";
import {LiNavItem} from "../lists/LiNavItem";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants/configConstants";
import {faBars, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {
    Icon,
    adminIconDuoTone,
    dashboardIconDuoTone,
    issueIconDuoTone,
    marvelKlubbenIconDuoTone,
    publishersIconDuoTone,
    settingsIconDuoTone,
    startIconDuoTone,
    titlesIconDuoTone,
    usersIconDuoTone,
    valueIconDuoTone
} from "../icons";
import {NavDropdown} from "react-bootstrap";
import {NavDropdownTitle} from "../minis/NavDropdownTitle";
import {BREADCRUMB_NAMES, LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {NavigationLogo} from "./NavigationLogo";


export const AuthorizedNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const collapseClassShow = "collapse navbar-collapse show pt-3 pt-lg-0";
    const collapseClass = "collapse navbar-collapse";
    const {profile, showUserNotification, showAdminNotification, showAdminTodoNotification} = useAppContext();

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return profile && (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-3 pt-1">
                <NavigationLogo/>
                <button
                    className={isOpen ? "btn sms-icon-btn d-block d-lg-none text-danger px-2" : "btn sms-icon-btn d-block d-lg-none text-primary px-2"}
                    onClick={handleClick}>
                    <span className={"visually-hidden"}>menu</span>
                    {isOpen ? <Icon icon={faTimes} className={"fa-2xl sms-icon--hovering"}/> :
                        <Icon icon={faBars} className={"fa-2xl sms-icon--hovering"}/>}
                </button>
                <div className={isOpen ? collapseClassShow : collapseClass} id="navbarSupportedContent">
                    {/* desktop ul (no click handler) */}
                    <ul className="d-none d-lg-flex navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem customClass={"ms-3"} route={ROUTES.DEFAULT} icon={<Icon icon={startIconDuoTone} size={"2x"}/>}
                                   text={LABELS.COMMON.HOME}
                                   doShowNotification={showUserNotification} isUserNotification={true}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} icon={<Icon icon={dashboardIconDuoTone} size={"2x"}/>}
                                   text={LABELS.SECTIONS.DASHBOARD.NAME}/>
                        <NavDropdown as={"li"} title={<NavDropdownTitle/>} id="basic-nav-dropdown">
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.TITLES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={titlesIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.TITLES.ALL_TITLES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.ISSUES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={issueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.ISSUES.ALL_ISSUES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.GRADE_VALUES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={valueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.GRADES.GRADE_VALUES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.MARVELKLUBBEN} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={marvelKlubbenIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.PUBLISHERS} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={publishersIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.USERS} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={usersIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{LABELS.SECTIONS.USERS.ALL_USERS}</span>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <LiNavItem route={ROUTES.PROFILE} icon={<Icon icon={settingsIconDuoTone} size={"2x"}/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {
                            profile.role >= 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} icon={<Icon icon={adminIconDuoTone} size={"2x"}/>} text={BREADCRUMB_NAMES.ADMIN}
                                       doShowNotification={showAdminNotification || showAdminTodoNotification} isAdminNotification={true}/>
                        }
                        <li className="nav-item">
                            <NavbarProfileInformation/>
                            <SignOutButton/>
                        </li>
                    </ul>
                    {/* mobile ul */}
                    <ul className="d-lg-none navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} onClick={handleClick} icon={<Icon icon={startIconDuoTone} size={"1x"}/>}
                                   doShowNotification={showUserNotification} isUserNotification={true}
                                   text={LABELS.COMMON.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} onClick={handleClick} icon={<Icon icon={dashboardIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.DASHBOARD.NAME}/>
                        <LiNavItem route={ROUTES.TITLES} onClick={handleClick} icon={<Icon icon={titlesIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.TITLES.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.ISSUES} onClick={handleClick} icon={<Icon icon={issueIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.ISSUES.ALL_ISSUES}/>
                        <LiNavItem route={ROUTES.GRADE_VALUES} onClick={handleClick} icon={<Icon icon={valueIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.GRADES.GRADE_VALUES}/>
                        <LiNavItem route={ROUTES.MARVELKLUBBEN} onClick={handleClick} icon={<Icon icon={marvelKlubbenIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}/>
                        <LiNavItem route={ROUTES.PUBLISHERS} onClick={handleClick} icon={<Icon icon={publishersIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}/>
                        <LiNavItem route={ROUTES.USERS} onClick={handleClick} icon={<Icon icon={usersIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.USERS.ALL_USERS}/>
                        <LiNavItem route={ROUTES.PROFILE} onClick={handleClick} icon={<Icon icon={settingsIconDuoTone} size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {
                            profile.role >= 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} onClick={handleClick} icon={<Icon icon={adminIconDuoTone} size={"1x"}/>}
                                       doShowNotification={showAdminNotification || showAdminTodoNotification}
                                       isAdminNotification={true}
                                       text={BREADCRUMB_NAMES.ADMIN}/>
                        }
                        <li className="nav-item">
                            <NavbarProfileInformation/>
                            <SignOutButton mobile/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
