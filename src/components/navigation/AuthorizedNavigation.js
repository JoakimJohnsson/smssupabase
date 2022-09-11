import React, {useState} from "react";
import {Link} from "react-router-dom";
import {MenuIcon, XIcon} from "@heroicons/react/solid";
import shieldWhite from "../../assets/images/shield__white.svg";
import {SignOutButton} from "../miniComponents/SignOutButton";
import {useAppContext} from "../../context/AppContext";
import {NavbarProfileInformation} from "../NavbarProfileInformation";
import {LiNavItem} from "../listComponents/LiNavItem";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants";
import {AdminIcon, DashboardIcon, SettingsIcon, StartIcon, TitlesIcon} from "../icons";

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
            <div className="container-fluid px-3">
                <Link to={ROUTES.DEFAULT} className={"hocus-standard h-100 d-flex align-items-center"}>
                    <img className={"sms-logo-shield me-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <div className={"sms-logo-text"}>
                        <span className={"d-none d-sm-inline"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                        <span className={"d-inline d-sm-none"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
                    </div>
                </Link>
                <button className={isOpen ? "btn d-block d-lg-none text-danger" : "btn d-block d-lg-none text-primary"}
                        onClick={handleClick}>
                    <span className={"visually-hidden"}>menu</span>
                    {isOpen ? <XIcon className={"sms-icon--hamburger"}/> : <MenuIcon className={"sms-icon--hamburger"}/>}
                </button>
                <div className={isOpen ? collapseClassShow : collapseClass} id="navbarSupportedContent">

                    {/* desktop ul (no click handler) */}
                    <ul className="d-none d-lg-flex navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} icon={<StartIcon/>} text={LABELS_AND_HEADINGS.HOME}/>
                        <LiNavItem route={ROUTES.DASHBOARD.ROOT} icon={<DashboardIcon/>} text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={ROUTES.TITLES} icon={<TitlesIcon/>} text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                        <LiNavItem route={ROUTES.SETTINGS} icon={<SettingsIcon/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                        <LiNavItem route={ROUTES.ADMIN.ROOT} icon={<AdminIcon/>} text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className="nav-item">
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton/>
                        </li>
                    </ul>
                    {/* mobile ul */}
                    <ul className="d-lg-none navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-lg-0">
                        <LiNavItem route={ROUTES.DEFAULT} onClick={handleClick} icon={<DashboardIcon/>} text={LABELS_AND_HEADINGS.DASHBOARD}/>
                        <LiNavItem route={ROUTES.SETTINGS} onClick={handleClick} icon={<SettingsIcon/>} text={LABELS_AND_HEADINGS.SETTINGS}/>
                        {role === 1 &&
                        <LiNavItem route={ROUTES.ADMIN.ROOT} onClick={handleClick} icon={<AdminIcon/>} text={LABELS_AND_HEADINGS.ADMIN}/>
                        }
                        <li className="nav-item">
                            {avatarImageUrl ? <NavbarProfileInformation/> : false}
                            <SignOutButton/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
