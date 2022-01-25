import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

const OverviewPane = () => {
    return (
        <Tab.Pane eventKey={PANES.OVERVIEW.KEY}>
            <h2>{PANES.OVERVIEW.NAME}</h2>
            <p className="lead mb-5">
                En cool översikt.
            </p>
        </Tab.Pane>
    )
}
export default OverviewPane;
