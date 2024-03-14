import React from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../helpers/constants";
import {TitlesSection} from "../../dashboard/dashboardSections/admin/TitlesSection";
import {PublishersSection} from "../../dashboard/dashboardSections/admin/PublishersSection";
import {HeadingWithBreadCrumbs} from "../../headings";
import {Icon} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {UsersSection} from "../../dashboard/dashboardSections/admin/UsersSection";
import {useAppContext} from "../../../context/AppContext";
import {UtilsSection} from "../../dashboard/dashboardSections/admin/UtilsSection";
import {Link} from "react-router-dom";
import {MessagesSection} from "../../dashboard/dashboardSections/admin/MessagesSection";
import {isSuperAdmin} from "../../../services/profileService";
import {BREADCRUMB_NAMES} from "../../../helpers/textConstants/labelsAndHeadings";


export const Admin = () => {

    const {profile} = useAppContext();

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col--full"}>
                    <HeadingWithBreadCrumbs text={BREADCRUMB_NAMES.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                    <p>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.ALL_TITLES}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.USERS}>{LABELS_AND_HEADINGS.ALL_USERS}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.MESSAGES}>{LABELS_AND_HEADINGS.ALL_MESSAGES}</Link>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                {
                    isSuperAdmin(profile) &&
                    <MessagesSection/>
                }
                <TitlesSection/>
                <PublishersSection/>
                {
                    isSuperAdmin(profile) &&
                    <UsersSection/>
                }
                <UtilsSection/>
            </div>
        </main>
    )
}
