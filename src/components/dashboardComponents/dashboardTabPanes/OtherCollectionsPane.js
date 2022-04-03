import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

export const OtherCollectionsPane = () => {
    return (
        <Tab.Pane eventKey={PANES.OTHER_COLLECTIONS.KEY}>
            <h1>{PANES.OTHER_COLLECTIONS.NAME}</h1>
            <p className="lead mb-5">
                Andras fräna samlingar
            </p>
        </Tab.Pane>
    )
}
