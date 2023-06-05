import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../../helpers/constants";
import {UpdateReleaseDateButton} from "../../../minis/UpdateReleaseDateButton";


export const UtilsSection = () => {

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.UTILS}</h2>
                <p>{TEXTS.UTILS}</p>
                <h3>{LABELS_AND_HEADINGS.RELEASE_DATE}</h3>
                <p>{TEXTS.UTILS_UPDATE_RELEASE_DATE}</p>
                <UpdateReleaseDateButton />
            </div>
        </div>
    )
}