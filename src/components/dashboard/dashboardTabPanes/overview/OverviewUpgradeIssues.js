import React, {useEffect, useState} from "react";
import {getUpgradeIssuesForUser} from "../../../../services/collectingService";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {sortByName} from "../../../../helpers/functions";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {useAppContext} from "../../../../context/AppContext";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const OverviewUpgradeIssues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        getUpgradeIssuesForUser(user.id, setIssuesData).then(() => setLoading(false));
    }, [user.id]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.ISSUES.UPGRADE_ISSUES}</h2>
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
                                    <p>{LABELS.SECTIONS.ISSUES.NO_UPGRADE_ISSUES}</p>
                            }
                        </ul>
                }
            </div>
        </div>
    )
}
