import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboard/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboard/dashboardCards/admin/PublishersCard";
import {HeadingWithBreadCrumbs} from "../../headings";
import {Icon} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {UsersCard} from "../../dashboard/dashboardCards/admin/UsersCard";
import {useAppContext} from "../../../context/AppContext";


export const Admin = () => {

    const {profile} = useAppContext();

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"row-padding--main"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                    <p>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <TitlesCard/>
                <PublishersCard/>
                {
                    profile && profile.role && profile.role === 2 &&
                    <UsersCard/>
                }
            </div>
        </main>
    )
}
