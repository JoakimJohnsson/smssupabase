import React from "react";
import {Nav} from "react-bootstrap";

const SidebarNavLink = ({eventKey, variant, Icon, text, handleClick}) => {
    const className = "nav-item";
    return (
        <Nav.Link eventKey={eventKey} className={className + ' ' + variant}>
            <div onClick={handleClick} className={'d-flex align-items-center justify-content-sm-start justify-content-center flex-column flex-sm-row w-100'}>
                {Icon}
                <span className={'sidebar-navlink-text'}>{text}</span>
            </div>
        </Nav.Link>
    )
}
export default SidebarNavLink;
