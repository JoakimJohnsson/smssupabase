import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import shieldBlack from "../../assets/images/shield__black.svg";
import {MenuIcon, XIcon, HomeIcon, PresentationChartLineIcon, CogIcon} from "@heroicons/react/solid";
import SignOutButton from "../SignOutButton";

const AuthorizedNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={""}>
            <Link to="/">
                <div className={""}>
                    <img className={""} src={shieldBlack} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
            </Link>
            <div className={""}>
                <button className={""} onClick={() => setIsOpen(!isOpen)}>
                    <span className={"sr-only"}>menu</span>
                    {
                        isOpen ?
                            <XIcon className={""}/>
                            :
                            <MenuIcon className={""}/>
                    }
                </button>
            </div>
            <div className={
                isOpen ?
                    ""
                    :
                    ""
            }>
                <div className={""}>
                    <NavLink exact to="/" className={""} onClick={() => setIsOpen(!isOpen)}><HomeIcon
                        className={""}/>Start</NavLink>
                    <NavLink exact to="/dashboard" className={""} onClick={() => setIsOpen(!isOpen)}><PresentationChartLineIcon
                        className={""}/>Dashboard</NavLink>
                    <NavLink to="/dashboard/settings" className={""}
                             onClick={() => setIsOpen(!isOpen)}><CogIcon className={""}/>Settings</NavLink>
                    <SignOutButton/>
                </div>
            </div>
        </nav>
    )
};

export default AuthorizedNavigation;
