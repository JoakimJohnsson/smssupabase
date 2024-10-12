import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants/configConstants";


export const SkipLink = () => {

    return (
        <div className={"skip-link"}>
            <a href={"#main-content"} >{LABELS_AND_HEADINGS.SKIP_LINK_TEXT}</a>
        </div>
    )
}
