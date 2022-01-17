import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import FormatCard from "../dashboardCards/FormatCard";

const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>{LABELS_AND_HEADINGS.ADMIN}</h1>
                </div>

                <FormatCard/>
            </div>
        </main>
    )
}

export default Admin;
