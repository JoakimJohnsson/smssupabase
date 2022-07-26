import React from "react";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {deleteRowsByTableAndId} from "../../serviceFunctions";


export const TitlesListAdminToolBox = ({id, name, setTitlesData, titlesData}) => {

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.TITLE_EDIT + id} className={'btn btn-primary m-1 p-1'} title={LABELS_AND_HEADINGS.EDIT}>
                <PencilAltIcon className={"sms-icon--text-lg m-0"}/>
                <span className={"visually-hidden"}>{LABELS_AND_HEADINGS.EDIT}</span>
            </Link>
            <button
                className={'btn btn-danger m-1 p-1'}
                aria-label={LABELS_AND_HEADINGS.DELETE}
            onClick={() => deleteRowsByTableAndId('titles', id, name, setTitlesData, titlesData)}>
                <XCircleIcon className={"sms-icon--text-lg m-0"}/>
            </button>
        </div>
    )
}
