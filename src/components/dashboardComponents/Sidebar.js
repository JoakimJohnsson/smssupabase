import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";


const Sidebar = ({isOpen, handleClick}) => {

    return (
        <div className={'d-none d-md-flex dashboard-sidebar'}>
            <Offcanvas show={isOpen} onHide={handleClick}>
                <Offcanvas.Header closeButton closeLabel={LABELS_AND_HEADINGS.CLOSE}>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar;
