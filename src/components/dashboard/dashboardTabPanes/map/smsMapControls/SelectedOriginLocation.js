import React from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";
import {getPostalTownOrCountry} from "../../../../../helpers/functions";


export const SelectedOriginLocation = ({selectedOrigin}) => {

    return selectedOrigin ?
        <p>
            <span className={"text-label"}>{PANES.MAP.YOUR_SELECTED_ORIGIN_LOCATION}</span> {
            <span>{selectedOrigin.name || getPostalTownOrCountry(selectedOrigin.address_components)}</span>
        }
        </p>
        :
        <p>{PANES.MAP.NO_SELECTED_ORIGIN_LOCATION}</p>
}
