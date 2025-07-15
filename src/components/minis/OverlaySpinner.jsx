import React from "react";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons/Icons.jsx";

export const OverlaySpinner = () => {


    return (
        <div className={"overlay-spinner-wrapper"} role="status" aria-live="polite" aria-label="Loading">
            <Icon icon={faSpinner} size={"4x"} className={"overlay-spinner"} spin/>
        </div>
    )
}
