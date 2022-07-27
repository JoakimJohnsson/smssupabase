import React from "react";
import {Link} from "react-router-dom";
import {BUCKETS, LABELS_AND_HEADINGS, MESSAGES, ROUTES} from "../../../helpers/constants";
import {PencilAltIcon, XCircleIcon} from "@heroicons/react/solid";
import {deleteRowsByTableAndId} from "../../serviceFunctions";
import {supabase} from "../../../supabase/supabaseClient";


export const TitlesListAdminToolBox = ({id, name, image, setTitlesData, titlesData}) => {

    const handleDelete = async () => {
        try {
            let {error} = await supabase.storage
                .from(BUCKETS.TITLE_IMAGES)
                .remove([image]);
            if (error) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            deleteRowsByTableAndId('titles', id, name, setTitlesData, titlesData).then();
        }
    }

    return (
        <div className={"ms-2 d-inline-block"}>
            <Link to={ROUTES.ADMIN.TITLE_EDIT + id} className={'btn btn-primary m-1 p-1'} title={LABELS_AND_HEADINGS.EDIT}>
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
