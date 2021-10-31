import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import shieldBlack from "../../assets/images/shield__black.svg";
import {HomeIcon, MenuIcon, XIcon, LoginIcon} from '@heroicons/react/solid';

const UnauthorizedNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6 border-b border-blue-1000">
            <Link to="/">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <img className={"w-5 h-5 mr-1 sm:w-8 sm:h-8 sm:mr-3"} src={shieldBlack} alt={"Svenska marvelsamlare logo"}/>
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
                <div className="text-sm lg:flex-grow lg:flex justify-end">
                    <NavLink exact to="/" className="nav-link" onClick={() => setIsOpen(!isOpen)}><HomeIcon
                        className="h-5 w-5 inline mr-1"/>Start</NavLink>
                    <NavLink to="/login" className="nav-link" onClick={() => setIsOpen(!isOpen)}><LoginIcon
                        className="h-5 w-5 inline mr-1"/>Login</NavLink>
                </div>
            </div>
        </nav>
    )
};

export default UnauthorizedNavigation;
