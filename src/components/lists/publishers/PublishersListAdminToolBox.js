import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {handleDelete} from "../../serviceFunctions";


export const PublishersListAdminToolBox = ({publisher, setPublishersData, publishersData}) => {

    const editText = LABELS_AND_HEADINGS.EDIT + " " + publisher.name;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + publisher.name;

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.PUBLISHERS + publisher.id + "?edit=true"} className={"btn text-primary sms-icon-btn"} title={editText}>
                <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                <span className={"visually-hidden"}>{editText}</span>
            </Link>
            <button
                className={"btn text-danger sms-icon-btn"}
                aria-label={deleteText}
                onClick={() => handleDelete(TABLES.PUBLISHERS, publisher.id, publisher.name, setPublishersData, publishersData, publisher.image, BUCKETS.PUBLISHER_IMAGES)}>
                <XCircleIcon className={"sms-icon--text-lg m-0"}/>
            </button>
        </div>
    )
}
