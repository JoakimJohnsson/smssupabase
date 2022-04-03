import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

export const TitlesPane = () => {
    return (
        <Tab.Pane eventKey={PANES.TITLES.KEY}>
            <h1>{PANES.TITLES.NAME}</h1>
            <p className="lead mb-5">
                Mina coola titlar.
            </p>
        </Tab.Pane>
    )
}
