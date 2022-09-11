import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const ToggleEditButtons = ({customClass, edit, setSearchParams}) => {

    const className = "btn btn-primary me-3 " + customClass;

    return (
        <>
            <button onClick={() => setSearchParams({edit: !edit})} className={className}>
                {edit ? LABELS_AND_HEADINGS.SAVE : LABELS_AND_HEADINGS.EDIT}
            </button>
            {edit && <button className={"btn btn-outline-secondary"} onClick={() => setSearchParams({edit: !edit})}>
                {LABELS_AND_HEADINGS.ABORT}
            </button>}
        </>
    )
}
