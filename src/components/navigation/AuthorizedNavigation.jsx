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
    valueIconDuoTone, moreIconDuoTone, overviewIconDuoTone, mapsIconDuoTone, collectionsIconDuoTone, lessIconDuoTone
} from "../icons";
import {NavDropdown} from "react-bootstrap";
import {NavDropdownTitle} from "../minis/NavDropdownTitle";
import {BREADCRUMB_NAMES, LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {NavigationLogo} from "./NavigationLogo";
import {PANES} from "../../helpers/constants/textConstants/texts";


export const AuthorizedNavigation = () => {
    // Object to hold many different open states
    const [openStates, setOpenStates] = useState({
        isOpen: false,
        isOpen2: false,
        isOpen3: false
    });
    const collapseClassShow = "collapse navbar-collapse show pt-3 pt-lg-0";
    const collapseClass = "collapse navbar-collapse";
    const {profile, showUserNotification, showAdminNotification, showAdminTodoNotification} = useAppContext();
    const dropdownRef2 = useRef(null);
    const dropdownRef3 = useRef(null);

    // General click handler to handle open states
    const handleClick = (key) => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key]
        }));
    };

    const handleDropdownClick = (myKey, otherKey) => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            [myKey]: !prevStates[myKey],
            [otherKey]: false
        }));
    };

    const closeDropdowns = () => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            isOpen2: false,
            isOpen3: false
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) {
                setOpenStates((prevStates) => ({
                    ...prevStates,
                    isOpen2: false
                }));
            }
            if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) {
                setOpenStates((prevStates) => ({
                    ...prevStates,
                    isOpen3: false
                }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef2, dropdownRef3]);

    return profile && (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-3 pt-1">
                <NavigationLogo/>
                <button
                    className={openStates.isOpen ? "btn sms-icon-btn d-block d-lg-none text-danger px-2" : "btn sms-icon-btn d-block d-lg-none text-primary px-2"}
                    onClick={() => handleClick("isOpen")}>
                    <span className={"visually-hidden"}>menu</span>
                    {openStates.isOpen ? <Icon icon={faTimes} className={"fa-2xl sms-icon--hovering"}/> :
                        <Icon icon={faBars} className={"fa-2xl sms-icon--hovering"}/>}
                </button>
                <div className={openStates.isOpen ? collapseClassShow : collapseClass} id="navbarSupportedContent">
                    {/* desktop ul */}
                    <ul className="d-none d-lg-flex navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem onClick={closeDropdowns} customClass={"ms-3"} route={ROUTES.DEFAULT} icon={<Icon icon={startIconDuoTone} size={"2x"}/>}
                                   text={LABELS.COMMON.HOME}
                                   doShowNotification={showUserNotification} isUserNotification={true}/>
                        <NavDropdown ref={dropdownRef2} onClick={() => handleDropdownClick("isOpen2", "isOpen3")} as={"li"} title={<NavDropdownTitle icon={openStates.isOpen2 ? lessIconDuoTone : moreIconDuoTone} label={LABELS.SECTIONS.DASHBOARD.NAME}/>} id="basic-nav-dropdown">
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.DASHBOARD.PATH_OVERVIEW} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={overviewIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.OVERVIEW.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.DASHBOARD.PATH_MY_TITLES} className={"nav-link nav-link--dropdown"}>
                                    <Icon icon={titlesIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.TITLES.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.DASHBOARD.PATH_VALUATION} className={"nav-link nav-link--dropdown text-grade"}>
                                    <Icon icon={valueIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.VALUATION.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.DASHBOARD.PATH_COLLECTIONS} className={"nav-link nav-link--dropdown text-warning"}>
                                    <Icon icon={collectionsIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.COLLECTIONS.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={"p"} className={"mb-0"}>
                                <NavLink exact={"true"} to={ROUTES.DASHBOARD.PATH_MAP} className={"nav-link nav-link--dropdown text-country"}>
                                    <Icon icon={mapsIconDuoTone} className={"me-2"}/>
                                    <span className={"sms-nav-link--text"}>{PANES.MAP.NAME}</span>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown ref={dropdownRef3} onClick={() => handleDropdownClick("isOpen3", "isOpen2")} as={"li"} title={<NavDropdownTitle icon={openStates.isOpen3 ? lessIconDuoTone : moreIconDuoTone} label={LABELS.COMMON.MORE_CONTENT}/>} id="basic-nav-dropdown">
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
                        <LiNavItem onClick={closeDropdowns}  route={ROUTES.PROFILE} icon={<Icon icon={settingsIconDuoTone} size={"2x"}/>} text={LABELS.COMMON.SETTINGS}/>
                        {
                            profile.role >= 1 &&
                            <LiNavItem onClick={closeDropdowns}  route={ROUTES.ADMIN.ROOT} icon={<Icon icon={adminIconDuoTone} size={"2x"}/>} text={BREADCRUMB_NAMES.ADMIN}
                                       doShowNotification={showAdminNotification || showAdminTodoNotification} isAdminNotification={true}/>
                        }
                        <li className="nav-item">
                            <NavbarProfileInformation/>
                            <SignOutButton/>
                        </li>
                    </ul>
                    {/* mobile ul */}
                    <ul className="d-lg-none navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} onClick={() => handleClick("isOpen")} icon={<Icon icon={startIconDuoTone} size={"1x"}/>}
                                   doShowNotification={showUserNotification} isUserNotification={true}
                                   text={LABELS.COMMON.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.PATH_OVERVIEW} onClick={() => handleClick("isOpen")} icon={<Icon icon={overviewIconDuoTone} size={"1x"}/>}
                                   text={PANES.OVERVIEW.LONG_NAME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.PATH_MY_TITLES} onClick={() => handleClick("isOpen")} icon={<Icon icon={titlesIconDuoTone} size={"1x"}/>}
                                   text={PANES.TITLES.LONG_NAME}/>
                        <LiNavItem customClass={"text-grade"} route={ROUTES.DASHBOARD.PATH_VALUATION} onClick={() => handleClick("isOpen")} icon={<Icon icon={valueIconDuoTone} size={"1x"}/>}
                                   text={PANES.VALUATION.LONG_NAME}/>
                        <LiNavItem customClass={"text-warning"} route={ROUTES.DASHBOARD.PATH_COLLECTIONS} onClick={() => handleClick("isOpen")} icon={<Icon icon={collectionsIconDuoTone} size={"1x"}/>}
                                   text={PANES.COLLECTIONS.LONG_NAME}/>
                        <LiNavItem customClass={"text-country"} route={ROUTES.DASHBOARD.PATH_MAP} onClick={() => handleClick("isOpen")} icon={<Icon icon={mapsIconDuoTone} size={"1x"}/>}
                                   text={PANES.MAP.LONG_NAME}/>
                        <LiNavItem route={ROUTES.TITLES} onClick={() => handleClick("isOpen")} icon={<Icon icon={titlesIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.TITLES.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.ISSUES} onClick={() => handleClick("isOpen")} icon={<Icon icon={issueIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.ISSUES.ALL_ISSUES}/>
                        <LiNavItem route={ROUTES.GRADE_VALUES} onClick={() => handleClick("isOpen")} icon={<Icon icon={valueIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.GRADES.GRADE_VALUES}/>
                        <LiNavItem route={ROUTES.MARVELKLUBBEN} onClick={() => handleClick("isOpen")} icon={<Icon icon={marvelKlubbenIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}/>
                        <LiNavItem route={ROUTES.PUBLISHERS} onClick={() => handleClick("isOpen")} icon={<Icon icon={publishersIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}/>
                        <LiNavItem route={ROUTES.USERS} onClick={() => handleClick("isOpen")} icon={<Icon icon={usersIconDuoTone} size={"1x"}/>}
                                   text={LABELS.SECTIONS.USERS.ALL_USERS}/>
                        <LiNavItem route={ROUTES.PROFILE} onClick={() => handleClick("isOpen")} icon={<Icon icon={settingsIconDuoTone} size={"1x"}/>}
                                   text={LABELS.COMMON.SETTINGS}/>
                        {
                            profile.role >= 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} onClick={() => handleClick("isOpen")} icon={<Icon icon={adminIconDuoTone} size={"1x"}/>}
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
