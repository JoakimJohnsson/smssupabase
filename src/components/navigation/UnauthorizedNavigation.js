import React from 'react';
import {Link} from 'react-router-dom';
import shieldWhite from "../../assets/images/shield__white.svg";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const UnauthorizedNavigation = () => {
    return (
        <nav className={"p-3 navbar navbar-dark"}>
            <Link to="/" className={"hocus-standard h-100 d-flex align-items-center"}>
                <img className={"sms-logo-shield me-2"} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                <div className={"sms-logo-text"}>
                    <span className={"d-none d-sm-inline"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                    <span className={"d-inline d-sm-none"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
                </div>
            </Link>
        </nav>
    )
};
