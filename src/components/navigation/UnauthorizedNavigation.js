import React from 'react';
import {Link} from 'react-router-dom';
import shieldWhite from "../../assets/images/shield__white.svg";

const UnauthorizedNavigation = () => {

    return (
        <nav className={"bg-info"}>
            <div className={""}>
            <Link to="/">
                <div className={"bg-primary"}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
                <div className={"bg-secondary"}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
                <div className={"bg-info"}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
                <div className={"bg-warning"}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
                <div className={"bg-success"}>
                    <img className={""} src={shieldWhite} alt={"Svenska marvelsamlare logo"}/>
                    <span className={""}>SVENSKA MARVELSAMLARE</span>
                    <span className={""}>SMS</span>
                </div>
                <div className={"bg-danger"}>
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
