import React, {useState} from "react";
import {Link} from "react-router-dom";
import shieldWhite from "../../assets/images/shield__white.svg";
import {SignOutButton} from "../minis/SignOutButton";
import {useAppContext} from "../../context/AppContext";
import {NavbarProfileInformation} from "../NavbarProfileInformation";
import {LiNavItem} from "../lists/LiNavItem";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants";
import {AdminIcon, DashboardIcon, Icon, SettingsIcon, StartIcon, TitlesIcon} from "../icons";
import {faBars, faTimes} from "@fortawesome/pro-regular-svg-icons";

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
                    <img className={"sms-logo-shield me-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
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
                        <LiNavItem route={ROUTES.DEFAULT} icon={<StartIcon size={"2x"}/>} text={LABELS_AND_HEADINGS.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} icon={<DashboardIcon size={"2x"}/>} text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={ROUTES.TITLES} icon={<TitlesIcon size={"2x"}/>} text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.SETTINGS} icon={<SettingsIcon size={"2x"}/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} icon={<AdminIcon size={"2x"}/>} text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className="nav-item">
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton/>
                        </li>
                    </ul>
                    {/* mobile ul */}
                    <ul className="d-lg-none navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} onClick={handleClick} icon={<StartIcon size={"1x"}/>} text={LABELS_AND_HEADINGS.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} onClick={handleClick} icon={<DashboardIcon size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={ROUTES.TITLES} onClick={handleClick} icon={<SettingsIcon size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.SETTINGS} onClick={handleClick} icon={<SettingsIcon size={"1x"}/>}
                                   text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                            <LiNavItem route={ROUTES.ADMIN.ROOT} onClick={handleClick} icon={<AdminIcon size={"1x"}/>}
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
