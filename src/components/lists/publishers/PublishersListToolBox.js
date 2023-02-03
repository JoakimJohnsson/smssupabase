import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {handleDelete} from "../../serviceFunctions";
import {useAppContext} from "../../../context/AppContext";


export const PublishersListToolBox = ({publisher, setPublishersData, publishersData, showAdminInfo}) => {

    const editText = LABELS_AND_HEADINGS.EDIT + " " + publisher.name;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + publisher.name;
    const {setInformationMessage} = useAppContext();

    return showAdminInfo ? (
            <div className={"ms-2 d-inline-block"}>
                <Link to={ROUTES.ADMIN.PUBLISHERS + publisher.id + "?edit=true"} className={"btn text-primary sms-icon-btn"} title={editText}>
                    <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                    <span className={"visually-hidden"}>{editText}</span>
                </Link>
                <button
                    className={"btn text-danger sms-icon-btn"}
                    aria-label={deleteText}
                    onClick={() => handleDelete(TABLES.PUBLISHERS, publisher.id, publisher.name, setPublishersData, publishersData, publisher.image, BUCKETS.PUBLISHER_IMAGES, setInformationMessage)}>
                    <XCircleIcon className={"sms-icon--text-lg m-0"}/>
                </button>
            </div>
        )
        :
        (
            <span className={"ms-2 bg-dog p-2 rounded-3 d-inline-block"}>User tools here</span>
        )
}
