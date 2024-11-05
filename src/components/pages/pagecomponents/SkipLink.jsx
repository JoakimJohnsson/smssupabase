import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";


export const SkipLink = () => {

    return (
        <div className={"skip-link"}>
            <a href={"#main-content"} >{LABELS.COMMON.SKIP_LINK_TEXT}</a>
        </div>
    )
}
