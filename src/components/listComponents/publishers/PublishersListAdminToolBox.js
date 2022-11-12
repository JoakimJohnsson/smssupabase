import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {deleteImageFromBucketSimple, deleteRowsByTableAndId} from "../../serviceFunctions";


export const PublishersListAdminToolBox = ({publisher, setPublishersData, publishersData}) => {

    const editText = LABELS_AND_HEADINGS.EDIT + " " + publisher.name;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + publisher.name;

    const handleDelete = async () => {
        try {
            deleteRowsByTableAndId(TABLES.PUBLISHERS, publisher.id, publisher.name, setPublishersData, publishersData)
                .then(() => deleteImageFromBucketSimple(publisher.image, BUCKETS.PUBLISHER_IMAGES));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.PUBLISHERS + publisher.id + "?edit=true"} className={"btn btn-primary m-1 p-1"} title={editText}>
                <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                <span className={"visually-hidden"}>{editText}</span>
            </Link>
            <button
                className={"btn btn-danger m-1 p-1"}
                aria-label={deleteText}
                onClick={handleDelete}>
                <XCircleIcon className={"sms-icon--text-lg m-0"}/>
            </button>
        </div>
    )
}
