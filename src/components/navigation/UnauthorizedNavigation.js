import React from 'react';
import {Link} from 'react-router-dom';
import shieldBlack from "../../assets/images/shield__black.svg";

const UnauthorizedNavigation = () => {

    return (
        <nav className="flex items-center justify-between flex-wrap p-6 border-b border-blue-1000">
            <Link to="/">
                <div className="flex items-center flex-shrink-0 mr-6">
                    <img className={"w-7 h-7 mr-1 sm:w-10 sm:h-10 sm:mr-3"} src={shieldBlack} alt={"Svenska marvelsamlare logo"}/>
                    <span className="hidden sm:inline font-semibold text-xl">SVENSKA MARVELSAMLARE</span>
                    <span className="inline sm:hidden font-semibold text-md">SMS</span>
                </div>
            </Link>
        </nav>
    )
};

export default UnauthorizedNavigation;
