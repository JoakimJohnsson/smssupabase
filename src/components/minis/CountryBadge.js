import React from "react";
import countryData from "../../helpers/valueLists/countries.json";
import {getDataName, getDataShade} from "../../helpers/functions/functions";


export const CountryBadge = ({countryId}) => {

    return countryId && (
        <span className={`tag-badge text-black bg-country-${getDataShade(countryData, countryId)}`}>{getDataName(countryData, countryId)}</span>
    )
}
