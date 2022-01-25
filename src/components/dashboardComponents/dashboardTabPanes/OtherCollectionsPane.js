import React from "react";
import {Tab} from "react-bootstrap";
import {PANES} from "../../../helpers/constants";

const OtherCollectionsPane = () => {
    return (
        <Tab.Pane eventKey={PANES.OTHER_COLLECTIONS.KEY}>
            <h2>{PANES.OTHER_COLLECTIONS.NAME}</h2>
            <p className="lead mb-5">
                Andras fräna samlingar
            </p>
        </Tab.Pane>
    )
}
export default OtherCollectionsPane;
