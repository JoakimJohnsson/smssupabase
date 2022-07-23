import React from "react";
import {Link} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";


export const TitlesListAdminToolBox = ({id}) => {

    return (
        <span className={"ms-2 bg-dog p-2 rounded-3 d-inline-block"}>
            <Link to={`/admin/titles/edit/${id}`} className={'me-2'}>{LABELS_AND_HEADINGS.EDIT}</Link>
        </span>
    )
}
