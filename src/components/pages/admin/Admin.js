import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboardComponents/dashboardCards/admin/TitlesCard";
import {BanIcon} from "@heroicons/react/solid";
import {PublishersCard} from "../../dashboardComponents/dashboardCards/admin/PublishersCard";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ADMIN}</span></h1>
                </div>
                <div className={'row main-col'}>
                    <TitlesCard/>
                    <PublishersCard/>
                </div>

            </div>
        </main>
    )
}
