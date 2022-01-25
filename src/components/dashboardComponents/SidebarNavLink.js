import React from "react";
import {Nav} from "react-bootstrap";

const SidebarNavLink = ({eventKey, variant, icon, text}) => {
    const className = "nav-item";
    return (
        <Nav.Link eventKey={eventKey} className={className + ' ' + variant}>
            {icon}
            {text}
        </Nav.Link>
    )
}
export default SidebarNavLink;
