import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import shieldBlack from "../../assets/images/shield__black.svg";
import {MenuIcon, XIcon} from '@heroicons/react/solid';

const UnauthorizedNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap p-6 border-b-4 border-yellow-400">
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
                    <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setIsOpen(!isOpen)}>Login</Link>
                    <Link to="/signup" className="block mt-4 lg:inline-block lg:mt-0 mr-4" onClick={() => setIsOpen(!isOpen)}>Sign up</Link>
                </div>
            </div>
        </nav>
    )
};

export default UnauthorizedNavigation;
