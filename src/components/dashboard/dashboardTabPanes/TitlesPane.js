import React from "react";
import {PANES} from "../../../helpers/constants";

export const TitlesPane = () => {
    return (
        <div>
            <h1>{PANES.TITLES.NAME}</h1>
            <p className="lead mb-5">
                Mina coola titlar.
            </p>
        </div>
    )
}
