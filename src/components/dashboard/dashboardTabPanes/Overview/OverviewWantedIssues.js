import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants/configConstants";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {getWantedIssuesForUser} from "../../../../services/collectingService";
import {sortByName} from "../../../../helpers/functions";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {useAppContext} from "../../../../context/AppContext";


export const OverviewWantedIssues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        getWantedIssuesForUser(user.id, setIssuesData).then(() => setLoading(false));
    }, [user.id]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.WANTED_ISSUES}</h2>
                {
                    loading ?
                        <CustomSpinner/>
                        :
                        <ul className={"sms-list--with-cards"}>
                            {
                                issuesData ?
                                issuesData
                                    .sort((a, b) => sortByName(a.titles, b.titles))
                                    .map((issue, index) =>
                                        <IssueLinkCard key={issue.id} issue={issue} index={index} simple/>
                                    )
                                    :
                                    <p>{LABELS_AND_HEADINGS.NO_WANTED_ISSUES}</p>
                            }
                        </ul>
                }
            </div>
        </div>
    )
}
