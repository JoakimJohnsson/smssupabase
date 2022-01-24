import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import SidebarBody from "./SidebarBody";
import {ChevronDoubleLeftIcon} from "@heroicons/react/solid";


const Sidebar = ({isOpen, handleClick}) => {

    return (
        <div className={'d-none d-md-flex dashboard-sidebar'}>
            <SidebarBody />
            <Offcanvas show={isOpen} onHide={handleClick} className={'dashboard-sidebar'}>
                <Offcanvas.Header className={'py-0 justify-content-end'}>
                    <button className={'btn btn-link d-block d-md-none'} onClick={handleClick} aria-label={LABELS_AND_HEADINGS.CLOSE}>
                        <ChevronDoubleLeftIcon className={'sms-icon--hamburger text-danger me-0'}/>
                    </button>
                </Offcanvas.Header>
                <Offcanvas.Body className={'pt-0'}>
                    <SidebarBody handleClick={handleClick}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar;
