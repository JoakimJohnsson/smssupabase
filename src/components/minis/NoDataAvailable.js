import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {Icon, statusIconSadFailDuoTone, valueIconDuoTone} from "../icons";


export const NoDataAvailable = ({isUser = false, isValuation = false}) => {

    let label = TEXTS.NO_DATA_AVAILABLE;
    let icon = statusIconSadFailDuoTone;

    if (isUser) {
        label = TEXTS.NO_USER_AVAILABLE;
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
