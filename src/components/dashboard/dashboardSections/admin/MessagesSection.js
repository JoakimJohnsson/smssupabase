import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";


export const MessagesSection = () => {

    return (
        <div className={"sms-page-col mb-5 "}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.MESSAGES}</h2>
            </div>
        </div>
    )
}
