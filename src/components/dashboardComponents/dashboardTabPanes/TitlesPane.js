import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

const TitlesPane = () => {
    return (
        <Tab.Pane eventKey={PANES.TITLES.KEY}>
            <h2>{PANES.TITLES.NAME}</h2>
            <p className="lead mb-5">
                Mina coola titlar.
            </p>
        </Tab.Pane>
    )
}
export default TitlesPane;
