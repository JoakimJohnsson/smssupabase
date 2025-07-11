import React from "react";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import linksData from "../../../../helpers/valueLists/links.json";
import {Link} from "react-router-dom";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {
    Icon,
    issueIconDuoTone,
    marvelKlubbenIconDuoTone, publishersIconDuoTone,
    titlesIconDuoTone, usersIconDuoTone,
    valueIconDuoTone
} from "../../../icons";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const OverviewLinksSection = () => {

    return linksData ?
        <DashboardSectionLight>
            <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.SHORTCUTS}</h2>

            <h3>{LABELS.COMMON.MORE_CONTENT}</h3>
            <ul className={"list-unstyled"}>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.TITLES}>
                        <Icon icon={titlesIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.TITLES.ALL_TITLES}
                    </Link>
                </li>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ISSUES}>
                        <Icon icon={issueIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.ISSUES.ALL_ISSUES}
                    </Link>
                </li>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.GRADE_VALUES}>
                        <Icon icon={valueIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.GRADES.GRADE_VALUES}
                    </Link>
                </li>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.MARVELKLUBBEN}>
                        <Icon icon={marvelKlubbenIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}
                    </Link>
                </li>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.PUBLISHERS}>
                        <Icon icon={publishersIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}
                    </Link>
                </li>
                <li>
                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.USERS}>
                        <Icon icon={usersIconDuoTone} className={"me-2"} size={"1x"}/>
                        {LABELS.SECTIONS.USERS.ALL_USERS}
                    </Link>
                </li>
            </ul>
            <h3>{LABELS.COMMON.LINKS}</h3>
            <ul className={"list-unstyled"}>
                {
                    linksData.map((link) => {
                        return (
                            <li key={link.id}>
                                <Link className={"btn btn-outline-primary sms-btn"}
                                      to={link.url}>{link.url}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </DashboardSectionLight>
        :
        <CustomSpinner className={"mb-3 d-block"}/>
}
