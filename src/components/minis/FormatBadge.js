import React from "react";
import formatData from "../../helpers/valueLists/formats.json";
import {getDataName, getDataShade} from "../../helpers/functions";


export const FormatBadge = ({formatId, customClass, year = null}) => {

    const defaultClass = `tag-badge text-black bg-format-${getDataShade(formatData, formatId)}`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return formatId && (
        <span className={className}>{getDataName(formatData, formatId)} {year && year}</span>
    )
}
