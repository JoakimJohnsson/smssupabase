import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboard/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboard/dashboardCards/admin/PublishersCard";
import {AdminH1} from "../../headings";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row main-row-padding"}>
                <div className={"col-12 col-lg-8"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADMIN}/>
                </div>
            </div>
            <div className={"row secondary-row-padding"}>
                <TitlesCard/>
                <PublishersCard/>
            </div>


        </main>
    )
}
