import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import {OverviewTitles} from "./OverviewTitles";
import {OverviewIssues} from "./OverviewIssues";
import {OverviewUpgradeIssues} from "./OverviewUpgradeIssues";
import {OverviewWantedIssues} from "./OverviewWantedIssues";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverviewValuation} from "./OverviewValuation";
import {getCollectedIssuesWithTitlesForUser} from "../../../../services/collectingService";
import {OverviewLinks} from "./OverviewLinks";
import {OverviewMessages} from "./OverviewMessages";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [userIssuesData, setUserIssuesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getTitlesForUser(user.id, setUserTitlesData).then(() => setLoading(false));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getCollectedIssuesWithTitlesForUser(user.id, setUserIssuesData).then(() => setLoading(false));
        }
    }, [user]);

    return (
        <>
            <HeadingWithBreadCrumbs text={PANES.OVERVIEW.NAME}/>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <>
                        <OverviewMessages/>
                        <OverviewLinks/>
                        <OverviewTitles titlesData={userTitlesData}/>
                        <OverviewIssues titlesData={userTitlesData} issuesData={userIssuesData}/>
                        <OverviewValuation/>
                        <OverviewWantedIssues/>
                        <OverviewUpgradeIssues/>
                    </>
            }
        </>
    )
}
