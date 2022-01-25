import React from "react";
import {Nav} from "react-bootstrap";

const SidebarNavLink = ({eventKey, variant, Icon, text}) => {
    const className = "nav-item";
    return (
        <Nav.Link eventKey={eventKey} className={className + ' ' + variant}>
            {Icon}
            {text}
        </Nav.Link>
    )
}
export default SidebarNavLink;
