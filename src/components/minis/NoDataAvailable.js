import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Icon} from "../icons";
import {statusIconSadFailDuoTone, valueIconDuoTone} from "../icons-duotone";


export const NoDataAvailable = ({isUser = false, isValuation = false}) => {

    let label = LABELS_AND_HEADINGS.NO_DATA_AVAILABLE;
    let icon = statusIconSadFailDuoTone;

    if (isUser) {
        label = LABELS_AND_HEADINGS.NO_USER_AVAILABLE;
    } else if (isValuation) {
        label = LABELS_AND_HEADINGS.CALCULATING_VALUATION;
        icon = valueIconDuoTone;
    }

    return (
        <div className={"d-flex align-items-center py-2 mb-3"}>
            <Icon icon={icon} className={"fa-2xl fa-beat me-3"}/>
            <span className={"py-2 px-3 border fa-fade"}>{label}</span>
        </div>
    )
}
