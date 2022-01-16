import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

const Dashboard = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>{LABELS_AND_HEADINGS.DASHBOARD}</h1>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;
