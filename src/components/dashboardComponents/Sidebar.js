import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import SidebarBody from "./SidebarBody";


const Sidebar = ({isOpen, handleClick}) => {

    return (
        <div className={'d-none d-md-flex dashboard-sidebar'}>
            <SidebarBody />
            <Offcanvas show={isOpen} onHide={handleClick}>
                <Offcanvas.Header closeButton closeLabel={LABELS_AND_HEADINGS.CLOSE}>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SidebarBody />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar;
