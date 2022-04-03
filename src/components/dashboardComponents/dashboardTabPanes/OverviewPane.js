import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

export const OverviewPane = () => {
    return (
        <Tab.Pane eventKey={PANES.OVERVIEW.KEY}>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            <p className="lead mb-5">
                En cool översikt.
            </p>
        </Tab.Pane>
    )
}
