import React from "react";
import {sortByName} from "../../../../helpers/functions";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {useAppContext} from "../../../../context/AppContext";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {Link} from "react-router-dom";
import {Icon, userIconDuoTone} from "../../../icons/index.jsx";
import {PANES} from "../../../../helpers/constants/textConstants/texts.js";


export const OverviewFavoriteIssues = ({data}) => {

    const {user} = useAppContext();

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
                {
                    <ul className={"sms-list--with-cards"}>
                        {
                            data && data.length ?
                                <>
                                    {
                                        data
                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                            .map((issue, index) => {
                                                    if (index < 3) {
                                                        return <IssueLinkCard key={issue.id} issue={issue} variant={"marvelklubben"}
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
                    </ul>
                }
                {
                    data && data.length > 3 &&
                    <Link className={"btn btn-outline-warning sms-btn d-inline-block"} to={`/users/${user.id}`}>
                        <Icon icon={userIconDuoTone} className={"me-2"} size={"1x"}/>
                        {PANES.OVERVIEW.SEE_PROFILE_FOR_MORE_FAVORITES}
                    </Link>
                }
            </div>
        </div>
    )
}
