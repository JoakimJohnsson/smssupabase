import React from 'react';
import {Link} from 'react-router-dom';
import shieldWhite from "../../assets/images/shield__white.svg";

const UnauthorizedNavigation = () => {
    return (
        <nav className={"p-3"}>
            <Link to="/" className={"hocus-standard h-100 d-flex align-items-center"}>
                <img className={"sms-logo-shield me-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                <div className={"sms-logo-text"}>
                    <span className={"d-none d-sm-inline"}>SVENSKA MARVELSAMLARE</span>
                    <span className={"d-inline d-sm-none"}>SMS</span>
                </div>
            </Link>
        </nav>
    )
};

export default UnauthorizedNavigation;
