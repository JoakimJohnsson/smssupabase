import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import {SignOutButton} from "../minis/SignOutButton";
import {useAppContext} from "../../context/AppContext";
import {NavbarProfileInformation} from "../NavbarProfileInformation";
import {LiNavItem} from "../lists/LiNavItem";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants";
import {Icon} from "../icons";
import {faBars, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {
    AdminIconDuoTone,
    DashboardIconDuoTone, IssueIconDuoTone, IssuesIconDuoTone, LogoIconDuoTone,
    PublishersIconDuoTone,
    SettingsIconDuoTone,
    StartIconDuoTone,
    TitlesIconDuoTone
} from "../icons-duotone";
import {NavDropdown} from "react-bootstrap";
import {NavDropdownTitle} from "../minis/NavDropdownTitle";

export const AuthorizedNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const collapseClassShow = "collapse navbar-collapse show pt-3 pt-lg-0";
    const collapseClass = "collapse navbar-collapse";
    const {avatarImageUrl, role} = useAppContext();

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-3 pt-1">
                <Link to={ROUTES.DEFAULT} className={"hocus-standard h-100 d-flex align-items-center"}>
                    {/* desktop icon */}
                    <LogoIconDuoTone size={"3x"} className={"mx-3 fa-swap-opacity text-secondary d-none d-sm-flex"}/>
                    {/* mobile icon */}
                    <LogoIconDuoTone size={"2x"} className={"mx-2 fa-swap-opacity text-secondary d-flex d-sm-none"}/>
                    <div className={"sms-logo-text"}>
                        <span className={"d-none d-sm-inline"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                        <span className={"d-inline d-sm-none"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
                    </div>
                </Link>
                <button className={isOpen ? "btn sms-icon-btn d-block d-lg-none text-danger px-2" : "btn sms-icon-btn d-block d-lg-none text-primary px-2"}
                        onClick={handleClick}>
                    <span className={"visually-hidden"}>menu</span>
                    {isOpen ? <Icon icon={faTimes} className={"fa-2xl sms-icon--hovering"}/> : <Icon icon={faBars} className={"fa-2xl sms-icon--hovering"}/>}
                </button>
                <div className={isOpen ? collapseClassShow : collapseClass} id="navbarSupportedContent">

                    {/* desktop ul (no click handler) */}
                    <ul className="d-none d-lg-flex navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} icon={<StartIconDuoTone size={"2x"}/>} text={LABELS_AND_HEADINGS.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} icon={<DashboardIconDuoTone size={"2x"}/>} text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <NavDropdown title={<NavDropdownTitle/>} id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <NavLink exact={true} to={ROUTES.TITLES} className={"nav-link nav-link--dropdown"}>
                                    <TitlesIconDuoTone className={"me-2"}/><span className={"sms-nav-link--text"}>{LABELS_AND_HEADINGS.ALL_TITLES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink exact={true} to={ROUTES.PUBLISHERS} className={"nav-link nav-link--dropdown"}>
                                    <PublishersIconDuoTone className={"me-2"}/><span className={"sms-nav-link--text"}>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</span>
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink exact={true} to={ROUTES.ISSUES} className={"nav-link nav-link--dropdown"}>
                                    <IssueIconDuoTone className={"me-2"}/><span className={"sms-nav-link--text"}>{LABELS_AND_HEADINGS.ALL_ISSUES}</span>
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <LiNavItem route={ROUTES.SETTINGS} icon={<SettingsIconDuoTone size={"2x"}/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} icon={<AdminIconDuoTone size={"2x"}/>} text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className="nav-item">
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton/>
                        </li>
                    </ul>
                    {/* mobile ul */}
                    <ul className="d-lg-none navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} onClick={handleClick} icon={<StartIconDuoTone size={"1x"}/>} text={LABELS_AND_HEADINGS.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} onClick={handleClick} icon={<DashboardIconDuoTone size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={ROUTES.TITLES} onClick={handleClick} icon={<TitlesIconDuoTone size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.PUBLISHERS} onClick={handleClick} icon={<PublishersIconDuoTone size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                        <LiNavItem route={ROUTES.ISSUES} onClick={handleClick} icon={<IssuesIconDuoTone size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                        <LiNavItem route={ROUTES.SETTINGS} onClick={handleClick} icon={<SettingsIconDuoTone size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} onClick={handleClick} icon={<AdminIconDuoTone size={"1x"}/>}
                                       text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className="nav-item">
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton mobile/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
