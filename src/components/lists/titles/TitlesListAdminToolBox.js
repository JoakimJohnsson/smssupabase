import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {handleDelete} from "../../serviceFunctions";
import {useAppContext} from "../../../context/AppContext";


export const TitlesListAdminToolBox = ({title, setTitlesData, titlesData}) => {

    const editText = LABELS_AND_HEADINGS.EDIT + " " + title.name;
    const deleteText = LABELS_AND_HEADINGS.DELETE + " " + title.name;
    const {setInformationMessage} = useAppContext();

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.TITLES + title.id + "?edit=true"} className={"btn text-primary sms-icon-btn"} title={editText}>
                <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                <span className={"visually-hidden"}>{editText}</span>
            </Link>
            <button
                className={"btn text-danger sms-icon-btn"}
                aria-label={deleteText}
                onClick={() => handleDelete(TABLES.TITLES, title.id, title.name, setTitlesData, titlesData, title.image, BUCKETS.TITLE_IMAGES, setInformationMessage)}>
                <XCircleIcon className={"sms-icon--text-lg m-0"}/>
            </button>
        </div>
    )
}
