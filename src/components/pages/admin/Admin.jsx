import React from "react";
import {ROUTES} from "../../../helpers/constants/configConstants";
import {BREADCRUMB_NAMES, LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {TitlesSection} from "../../dashboards/admin/TitlesSection";
import {PublishersSection} from "../../dashboards/admin/PublishersSection";
import {Icon, mailIcon} from "../../icons/Icons.jsx";
import {UsersSection} from "../../dashboards/admin/UsersSection";
import {useAppContext} from "../../../context/AppContext";
import {UtilsSection} from "../../dashboards/admin/UtilsSection";
import {Link} from "react-router-dom";
import {MessagesSection} from "../../dashboards/admin/MessagesSection";
import {isSuperAdmin} from "../../../services/profileService";
import {PageMainContent} from "../pagecomponents/PageMainContent.jsx";


export const Admin = () => {

    const {profile} = useAppContext();

    return (
        <PageMainContent heading={BREADCRUMB_NAMES.ADMIN}>
            <div className="lead-wrapper">
                <p className={"lead"}>{TEXTS.ADMIN_LEAD}</p>
                <p>{TEXTS.ADMIN_INFO}</p>
                <p>
                    <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                        <Icon icon={mailIcon} className={"me-2"}/>
                        admin@svenskamarvelsamlare.se
                    </a>
                </p>
            </div>
            <div className="mb-5">
                <Link className={"btn btn-primary sms-btn"}
                      to={ROUTES.ADMIN.TITLES}>{LABELS.SECTIONS.TITLES.ALL_TITLES}</Link>
                <Link className={"btn btn-primary sms-btn"}
                      to={ROUTES.ADMIN.ISSUES}>{LABELS.SECTIONS.ISSUES.ALL_ISSUES}</Link>
                <Link className={"btn btn-primary sms-btn"}
                      to={ROUTES.ADMIN.PUBLISHERS}>{LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}</Link>
                <Link className={"btn btn-primary sms-btn"}
                      to={ROUTES.ADMIN.USERS}>{LABELS.SECTIONS.USERS.ALL_USERS}</Link>
                <Link className={"btn btn-primary sms-btn"}
                      to={ROUTES.ADMIN.MESSAGES}>{LABELS.SECTIONS.MESSAGES.ALL_MESSAGES}</Link>
            </div>
            <div className={"row"}>
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
        </PageMainContent>
    )
}
