import React from "react";
import formatData from "../../helpers/valueLists/formats.json";
import {getDataName, getDataShade} from "../../helpers/functions/functions";


export const FormatBadge = ({formatId, customClass}) => {

    const defaultClass = `tag-badge text-black bg-format-${getDataShade(formatData, formatId)}`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return formatId && (
        <span className={className}>{getDataName(formatData, formatId)}</span>
    )
}
