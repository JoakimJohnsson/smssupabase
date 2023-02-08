import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {faFaceSadTear} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";


export const NoDataAvailable = () => {

    return (
        <div className={"d-flex align-items-center py-2 mb-3"}>
            <Icon icon={faFaceSadTear} className={"fa-2xl fa-beat me-3"}/>
            <span className={"py-2 px-3 border fa-fade"}>{LABELS_AND_HEADINGS.NO_DATA_AVAILABLE}</span>
        </div>
    )
}
