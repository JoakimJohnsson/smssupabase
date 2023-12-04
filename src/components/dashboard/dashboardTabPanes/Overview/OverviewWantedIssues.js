import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";


export const OverviewWantedIssues = () => {

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.WANTED_ISSUES}</h2>
            </div>
        </div>
    )
}
