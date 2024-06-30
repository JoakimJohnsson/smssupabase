import React from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";


export const SelectedOrigin = ({selectedOrigin}) => {

    return (
        <p>
            <span className={"text-label"}>{PANES.MAP.YOUR_SELECTED_ORIGIN_LOCATION}</span> {
            <span>{selectedOrigin || PANES.MAP.NO_SELECTED_ORIGIN_LOCATION}</span>
        }
        </p>
    )
}
