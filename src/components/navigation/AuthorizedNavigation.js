import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import shieldBlack from "../../assets/images/shield__black.svg";
import {MenuIcon, XIcon, HomeIcon, PresentationChartLineIcon, CogIcon} from "@heroicons/react/solid";
import SignOutButton from "../SignOutButton";

const AuthorizedNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <Link to="/">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <img className={"w-7 h-7 mr-1 sm:w-10 sm:h-10 sm:mr-3"} src={shieldBlack} alt={"Svenska marvelsamlare logo"}/>
                    <span className="hidden sm:inline font-semibold text-xl">SVENSKA MARVELSAMLARE</span>
                    <span className="inline sm:hidden font-semibold text-md">SMS</span>
                </div>
            </Link>
            <div className="flex items-center flex-shrink-0 lg:hidden">
                <button className="flex items-center px-3 hover:opacity-70" onClick={() => setIsOpen(!isOpen)}>
                    <span className={"sr-only"}>menu</span>
                    {
                        isOpen ?
                            <XIcon className="h-6 sm:h-8 w-6 sm:w-8"/>
                            :
                            <MenuIcon className="h-6 sm:h-8 w-6 sm:w-8"/>
                    }
                </button>
            </div>
            <div className={
                isOpen ?
                    "w-full block flex-grow lg:flex lg:items-center lg:w-auto"
                    :
                    "w-full hidden flex-grow lg:flex lg:items-center lg:w-auto"
            }>
                <div className="text-sm lg:flex-grow lg:flex justify-end group">
                    <NavLink exact to="/" className="nav-link" onClick={() => setIsOpen(!isOpen)}><HomeIcon
                        className="h-5 w-5 inline mr-1"/>Start</NavLink>
                    <NavLink exact to="/dashboard" className="nav-link" onClick={() => setIsOpen(!isOpen)}><PresentationChartLineIcon
                        className="h-5 w-5 inline mr-1"/>Dashboard</NavLink>
                    <NavLink to="/dashboard/settings" className="nav-link"
                             onClick={() => setIsOpen(!isOpen)}><CogIcon className="h-5 w-5 inline mr-1"/>Settings</NavLink>
                    <SignOutButton/>
                </div>
            </div>
        </nav>
    )
};

export default AuthorizedNavigation;
