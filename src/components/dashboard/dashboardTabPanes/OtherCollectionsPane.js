import React from "react";
import {PANES} from "../../../helpers/constants";

export const OtherCollectionsPane = () => {
    return (
        <div>
            <h1>{PANES.OTHER_COLLECTIONS.NAME}</h1>
            <p className="lead mb-5">
                {PANES.OTHER_COLLECTIONS.NAME}
            </p>
        </div>
    )
}
