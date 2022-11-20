import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboard/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboard/dashboardCards/admin/PublishersCard";
import {AdminH1} from "../../headings";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12 col-lg-8"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <TitlesCard/>
                <PublishersCard/>
            </div>
        </main>
    )
}
