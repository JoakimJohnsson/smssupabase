import React from 'react';
import {Link} from 'react-router-dom';
import shieldWhite from "../../assets/images/shield__white.svg";

const UnauthorizedNavigation = () => {

    return (
        <nav className={"bg-info"}>
            <div className={""}>
            <Link to="/">
                <div className={""}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
            </Link>
            </div>
        </nav>
    )
};

export default UnauthorizedNavigation;
