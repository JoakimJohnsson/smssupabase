import React from "react";
import {sortByName} from "../../../../helpers/functions";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {useAppContext} from "../../../../context/AppContext";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {Link} from "react-router-dom";
import {Icon, userIconDuoTone} from "../../../icons/Icons.jsx";
import {PANES} from "../../../../helpers/constants/textConstants/texts.js";
import {SmsListWithCards} from "../../../pages/pagecomponents/SmsListWithCards.jsx";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const OverviewFavoriteIssuesSection = ({data}) => {

    const {user} = useAppContext();

    return (
        <DashboardSectionLight>
            <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
            {
                <SmsListWithCards>
                    {
                        data && data.length ?
                            <>
                                {
                                    data
                                        .sort((a, b) => sortByName(a.titles, b.titles))
                                        .map((issue, index) => {
                                                if (index < 3) {
                                                    return <IssueLinkCard key={issue.id} issue={issue}
                                                                          variant={"marvelklubben"}
                                                                          simple/>
                                                } else {
                                                    return null;
                                                }
                                            }
                                        )
                                }
                            </>
                            :
                            <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                    }
                </SmsListWithCards>
            }
            {
                data && data.length > 3 &&
                <Link className={"btn btn-outline-warning sms-btn d-inline-block"} to={`/users/${user.id}`}>
                    <Icon icon={userIconDuoTone} className={"me-2"} size={"1x"}/>
                    {PANES.OVERVIEW.SEE_PROFILE_FOR_MORE_FAVORITES}
                </Link>
            }
        </DashboardSectionLight>
    )
}
