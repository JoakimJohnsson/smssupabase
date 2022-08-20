import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboardComponents/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboardComponents/dashboardCards/admin/PublishersCard";
import {AdminIcon} from "../../icons/AdminIcon";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><AdminIcon textVariant={"xl"}/><span>{LABELS_AND_HEADINGS.ADMIN}</span></h1>
                </div>
                <div className={'row main-col'}>
                    <TitlesCard/>
                    <PublishersCard/>
                </div>

            </div>
        </main>
    )
}
