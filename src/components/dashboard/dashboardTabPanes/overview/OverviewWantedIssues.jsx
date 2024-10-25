import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants/configConstants";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {getWantedIssuesForUser} from "../../../../services/collectingService";
import {sortByName} from "../../../../helpers/functions";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {useAppContext} from "../../../../context/AppContext";
import {Link} from "react-router-dom";
import {Icon, userIconDuoTone} from "../../../icons/index.jsx";


export const OverviewWantedIssues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        getWantedIssuesForUser(user.id, setIssuesData)
            .then(() => setLoading(false))
            .catch(error => {
                console.error("Failed to get wanted issues: " + error);
                setLoading(false);
            });
    }, [user.id]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS_AND_HEADINGS.WANTED_ISSUES}</h2>
                {
                    loading ?
                        <CustomSpinner/>
                        :
                        <ul className={"sms-list--with-cards"}>
                            {
                                issuesData && issuesData.length ?
                                    <>
                                        {
                                            issuesData
                                                .sort((a, b) => sortByName(a.titles, b.titles))
                                                .map((issue, index) => {
                                                        if (index < 3) {
                                                            return <IssueLinkCard key={issue.id} issue={issue} simple/>
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )
                                        }
                                    </>
                                    :
                                    <p>{LABELS_AND_HEADINGS.NO_WANTED_ISSUES}</p>
                            }
                        </ul>
                }
                {
                    issuesData && issuesData.length > 3 &&
                    <Link className={"btn btn-outline-primary sms-btn d-inline-block"} to={`/users/${user.id}`}>
                        <Icon icon={userIconDuoTone} className={"me-2"} size={"1x"}/>
                        {PANES.OVERVIEW.SEE_PROFILE_FOR_MORE_WANTED}
                    </Link>
                }
            </div>
        </div>
    )
}
