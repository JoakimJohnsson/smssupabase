import React from "react";
import {PANES} from "../../../helpers/constants";

export const OverviewPane = () => {
    return (
        <div>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            <p className="lead mb-5">
                {PANES.OVERVIEW.NAME}
            </p>
        </div>
    )
}
