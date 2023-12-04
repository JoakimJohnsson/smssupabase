import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";


export const OverviewMissingIssues = () => {

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.MISSING_ISSUES}</h2>
            </div>
        </div>
    )
}
