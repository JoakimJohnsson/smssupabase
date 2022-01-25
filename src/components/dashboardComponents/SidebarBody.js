import React from "react";
import {CogIcon, ArchiveIcon, DocumentDuplicateIcon} from "@heroicons/react/solid";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Nav} from "react-bootstrap";

const SidebarBody = () => {
    return (
        <>
            <Nav className={'w-100 d-block pt-3 pt-md-5'}>
                <div className={'mb-3'}>
                <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>

                <Nav.Link eventKey="my-collection" className="nav-item primary"><ArchiveIcon className={'sms-icon--text'} />
                    Min samling
                </Nav.Link>
                <Nav.Link eventKey="something-else" className="nav-item primary"><DocumentDuplicateIcon className={'sms-icon--text'} />
                    Titlar
                </Nav.Link>
                </div>

                <div className={''}>
                <p className={'sidebar-label'}>{LABELS_AND_HEADINGS.MY_COLLECTION}</p>

                <Nav.Link eventKey="third" className="nav-item success"><ArchiveIcon className={'sms-icon--text'} />
                    Min samling
                </Nav.Link>
                <Nav.Link eventKey="fourth" className="nav-item success"><DocumentDuplicateIcon className={'sms-icon--text'} />
                    Titlar
                </Nav.Link>
                </div>

            </Nav>
        </>
    )
}

export default SidebarBody;
