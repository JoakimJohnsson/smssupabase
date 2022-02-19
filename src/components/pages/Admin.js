import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FormatCard} from "../dashboardComponents/dashboardCards/FormatCard";
import {TitlesCard} from "../dashboardComponents/dashboardCards/TitlesCard";

export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ADMIN}</h1>
                </div>
                <FormatCard/>
                <TitlesCard/>
            </div>
        </main>
    )
}
