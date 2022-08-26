import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {deleteImageSimple, deleteRowsByTableAndId} from "../../serviceFunctions";


export const PublishersListAdminToolBox = ({id, name, image, setPublishersData, publishersData}) => {

    const handleDelete = async () => {
        try {
            await deleteImageSimple(image, BUCKETS.PUBLISHER_IMAGES);
        } catch (error) {
            console.error("Error", error);
        } finally {
            deleteRowsByTableAndId(TABLES.PUBLISHERS, id, name, setPublishersData, publishersData).then();
        }
    }

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.PUBLISHERS + id + "/edit"} className={'btn btn-primary m-1 p-1'} title={LABELS_AND_HEADINGS.EDIT}>
                <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                <span className={"visually-hidden"}>{LABELS_AND_HEADINGS.EDIT}</span>
            </Link>
            <button
                className={'btn btn-danger m-1 p-1'}
                aria-label={LABELS_AND_HEADINGS.DELETE}
                onClick={handleDelete}>
                <XCircleIcon className={"sms-icon--text-lg m-0"}/>
            </button>
        </div>
    )
}
