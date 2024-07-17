import React from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";
import {getPostalTownOrCountry} from "../../../../../helpers/functions";


export const SelectedOriginLocation = ({selectedOrigin}) => {

    return (
        <p>
            <span className={"text-label"}>{PANES.MAP.YOUR_SELECTED_ORIGIN_LOCATION}</span> {
            <span>{getPostalTownOrCountry(selectedOrigin.address_components) || PANES.MAP.NO_SELECTED_ORIGIN_LOCATION}</span>
        }
        </p>
    )
}
