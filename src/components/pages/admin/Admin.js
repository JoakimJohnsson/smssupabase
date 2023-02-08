import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboard/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboard/dashboardCards/admin/PublishersCard";
import {HeadingWithBreadCrumbs} from "../../headings";
import {Icon} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


export const Admin = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12 col-lg-8"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                    <p>
                        <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <TitlesCard/>
                <PublishersCard/>
            </div>
        </main>
    )
}
