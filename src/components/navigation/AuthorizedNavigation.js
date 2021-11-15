import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {MenuIcon, XIcon, HomeIcon, PresentationChartLineIcon, CogIcon, BanIcon} from "@heroicons/react/solid";
import shieldWhite from "../../assets/images/shield__white.svg";
import SignOutButton from "../SignOutButton";
import {useAuth} from "../../contexts/Auth";

const AuthorizedNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);
    const collapseClassShow = "collapse navbar-collapse show pt-3 pt-xl-0";
    const collapseClass = "collapse navbar-collapse";
    const {profile} = useAuth();

    return (
        <nav className="navbar navbar-expand-xl navbar-dark py-3">
            <div className="container-fluid">
                <Link to="/" className={"hocus-standard h-100 d-flex align-items-center"}>
                    <img className={"sms-logo-shield me-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <div className={"sms-logo-text"}>
                        <span className={"d-none d-sm-inline"}>SVENSKA MARVELSAMLARE</span>
                        <span className={"d-inline d-sm-none"}>SMS</span>
                    </div>
                </Link>
                <button className={"btn text-white d-block d-xl-none"} onClick={() => setIsOpen(!isOpen)}>
                    <span className={"visually-hidden"}>menu</span>
                    {
                        isOpen ?
                            <XIcon className={"sms-icon--hamburger"}/>
                            :
                            <MenuIcon className={"sms-icon--hamburger"}/>
                    }
                </button>
                <div className={isOpen ? collapseClassShow : collapseClass} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto me-sm-0 ms-sm-auto pt-3 pt-xl-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className={"nav-link"}
                                     onClick={() => setIsOpen(!isOpen)}><HomeIcon className={"sms-icon--link"}/>
                                <span className={"sms-nav-link--text"}>Start</span>
                            </NavLink>

                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/dashboard" className={"nav-link"}
                                     onClick={() => setIsOpen(!isOpen)}><PresentationChartLineIcon className={"sms-icon--link"}/>
                                <span className={"sms-nav-link--text"}>Dashboard</span>
                            </NavLink>

                        </li>

                        <li className="nav-item">
                            <NavLink to="/dashboard/settings" className={"nav-link"}
                                     onClick={() => setIsOpen(!isOpen)}><CogIcon className={"sms-icon--link"}/>
                                <span className={"sms-nav-link--text"}>Settings</span>
                            </NavLink>
                        </li>

                        {profile.role === 1 ?
                            <li className="nav-item">
                                <NavLink to="/dashboard/admin" className={"nav-link"}
                                         onClick={() => setIsOpen(!isOpen)}><BanIcon className={"sms-icon--link"}/>
                                    <span className={"sms-nav-link--text"}>Admin {profile.firstname}</span>
                                </NavLink>
                            </li>
                            :
                            undefined
                        }

                        <li className="nav-item">
                            <SignOutButton/>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
};

export default AuthorizedNavigation;
