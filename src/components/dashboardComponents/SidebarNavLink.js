import React from "react";
import {Nav} from "react-bootstrap";

export const SidebarNavLink = ({eventKey, variant, Icon, text, handleClick}) => {
    const className = "nav-item";
    return (
        <Nav.Link eventKey={eventKey} className={className + ' ' + variant}>
            <div onClick={handleClick} className={'d-flex align-items-center justify-content-center justify-content-sm-start justify-content-md-center justify-content-lg-start  flex-column flex-sm-row flex-md-column flex-lg-row w-100'}>
                {Icon}
                <span className={'sidebar-navlink-text'}>{text}</span>
            </div>
        </Nav.Link>
    )
}
