import React from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../helpers/constants";
import {TitlesCard} from "../../dashboard/dashboardCards/admin/TitlesCard";
import {PublishersCard} from "../../dashboard/dashboardCards/admin/PublishersCard";
import {HeadingWithBreadCrumbs} from "../../headings";
import {Icon} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {UsersCard} from "../../dashboard/dashboardCards/admin/UsersCard";
import {useAppContext} from "../../../context/AppContext";
import {UtilsCard} from "../../dashboard/dashboardCards/admin/UtilsCard";
import {Link} from "react-router-dom";


export const Admin = () => {

    const {profile} = useAppContext();

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col--full"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                    <p>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.ALL_TITLES}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.ISSUES}>{LABELS_AND_HEADINGS.ALL_ISSUES}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.USERS}>{LABELS_AND_HEADINGS.ALL_USERS}</Link>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <TitlesCard/>
                <PublishersCard/>
                {
                    profile && profile.role && profile.role === 2 &&
                    <UsersCard/>
                }
                <UtilsCard/>
            </div>
        </main>
    )
}
