import React from "react";
import {ROUTES} from "../../../helpers/constants/configConstants";
import {BREADCRUMB_NAMES, LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {TitlesSection} from "../../dashboard/dashboardSections/admin/TitlesSection";
import {PublishersSection} from "../../dashboard/dashboardSections/admin/PublishersSection";
import {HeadingWithBreadCrumbs} from "../../headings";
import {Icon, mailIcon} from "../../icons";
import {UsersSection} from "../../dashboard/dashboardSections/admin/UsersSection";
import {useAppContext} from "../../../context/AppContext";
import {UtilsSection} from "../../dashboard/dashboardSections/admin/UtilsSection";
import {Link} from "react-router-dom";
import {MessagesSection} from "../../dashboard/dashboardSections/admin/MessagesSection";
import {isSuperAdmin} from "../../../services/profileService";


export const Admin = () => {

    const {profile} = useAppContext();

    return (
        <main id="main-content" className={"main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={BREADCRUMB_NAMES.ADMIN}/>
                    <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                    <p>{TEXTS.ADMIN_INFO}</p>
                    <p>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            <Icon icon={mailIcon} className={"me-2"}/>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </p>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.TITLES}>{LABELS.SECTIONS.TITLES.ALL_TITLES}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.ISSUES}>{LABELS.SECTIONS.ISSUES.ALL_ISSUES}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.USERS}>{LABELS.SECTIONS.USERS.ALL_USERS}</Link>
                    <Link className={"btn btn-primary sms-btn"} to={ROUTES.ADMIN.MESSAGES}>{LABELS.SECTIONS.MESSAGES.ALL_MESSAGES}</Link>
                </div>
            </div>
            <div className={"row row-padding--secondary mb-5"}>
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
