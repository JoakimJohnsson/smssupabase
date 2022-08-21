import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboardComponents/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboardComponents/dashboardCards/admin/PublishersCard";
import {AdminH1} from "../../headings";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADMIN}/>
                </div>
                <div className={'row main-col'}>
                    <TitlesCard/>
                    <PublishersCard/>
                </div>

            </div>
        </main>
    )
}
