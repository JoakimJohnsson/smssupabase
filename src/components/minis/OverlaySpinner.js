import React from "react";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";

export const OverlaySpinner = () => {


    return (
        <div className={"overlay-spinner-wrapper"}>
            <Icon icon={faSpinner} size={"4x"} className={"overlay-spinner"} spin/>
        </div>
    )
}
