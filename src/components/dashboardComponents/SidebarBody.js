import React from "react";
import {CogIcon, ArchiveIcon, DocumentDuplicateIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Nav} from "react-bootstrap";

const SidebarBody = () => {
    return (
        <>
            <Nav className={'px-3 px-md-3 py-md-5 w-100 d-block'}>
                <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>

                <Nav.Link eventKey="my-collection" className="nav-item nav-link"><ArchiveIcon className={'sms-icon--text'} />
                    Min samling
                </Nav.Link>
                <Nav.Link eventKey="something-else" className="nav-item nav-link"><DocumentDuplicateIcon className={'sms-icon--text'} />
                    Titlar
                </Nav.Link>
            </Nav>
        </>
    )
}

export default SidebarBody;
