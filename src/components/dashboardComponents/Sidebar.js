import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {SidebarBody} from "./SidebarBody";

export const Sidebar = ({isOpen, handleClick}) => {

    return (
        <div className={'d-none d-md-flex dashboard-sidebar'}>
            <SidebarBody/>
            <Offcanvas id={'sidebar-menu'} show={isOpen} onHide={handleClick} className={'dashboard-sidebar d-block d-md-none pt-3'}>
                <Offcanvas.Body className={'pt-0'}>
                    <SidebarBody handleClick={handleClick}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
