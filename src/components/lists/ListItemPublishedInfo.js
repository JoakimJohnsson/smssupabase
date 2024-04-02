import React from "react";
import {FriendlyDate} from "../minis/FriendlyDate";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const ListItemPublishedInfo = ({dateString}) => {

    return (
        <p className={"m-0"}>
            {LABELS.COMMON.CREATED_AT}: <FriendlyDate dateString={dateString}/>
        </p>
    )
}
