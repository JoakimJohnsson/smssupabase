import React from "react";
import {FriendlyDate} from "../minis/FriendlyDate";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";


export const ListItemPublishedInfo = ({dateString}) => {

    return (
        <p className={"m-0"}>
            {LABELS_AND_HEADINGS.CREATED_AT}: <FriendlyDate dateString={dateString}/>
        </p>
    )
}
