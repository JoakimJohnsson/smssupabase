import React from "react";
import {Nav} from "react-bootstrap";

const SidebarNavLink = ({eventKey, variant, Icon, text, handleClick}) => {
    const className = "nav-item";
    return (
        <Nav.Link eventKey={eventKey} className={className + ' ' + variant}>
            <div onClick={handleClick}>
                {Icon}
                {text}
            </div>
        </Nav.Link>
    )
}
export default SidebarNavLink;
