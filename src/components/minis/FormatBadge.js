import React from "react";
import formatData from "../../helpers/valueLists/formats.json";
import {getDataName, getDataShade} from "../../helpers/functions/functions";


export const FormatBadge = ({formatId}) => {

    return formatId && (
        <span className={`tag-badge text-black bg-format-${getDataShade(formatData, formatId)}`}>{getDataName(formatData, formatId)}</span>
    )
}
