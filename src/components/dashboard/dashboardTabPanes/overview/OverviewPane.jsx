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
import {getUserSelectedIssuesAndTitlesData} from "../../../../helpers/databaseFunctions.js";
import {OverviewFavoriteIssues} from "./OverviewFavoriteIssues.jsx";
import {OverviewFavoriteTitles} from "./OverviewFavoriteTitles.jsx";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [userCollectedIssuesData, setUserCollectedIssuesData] = useState(null);
    const [userIssuesData, setUserIssuesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getTitlesForUser(user.id, setUserTitlesData).then(() => setLoading(false));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getCollectedIssuesWithTitlesForUser(user.id, setUserCollectedIssuesData).then(() => setLoading(false));
        }
    }, [user]);

    useEffect(() => {
        const fetchIssuesData = async () => {
            const result = await getUserSelectedIssuesAndTitlesData(user.id);
            if (result) {
                if (result.data) {
                    setUserIssuesData(result.data);
                }
            }
        };
        fetchIssuesData().then(() => setLoading(false));
    }, [user.id]);

    console.log(userIssuesData);

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
                        <OverviewIssues titlesData={userTitlesData} issuesData={userCollectedIssuesData}/>
                        <OverviewValuation/>
                        <OverviewWantedIssues data={userIssuesData?.wanted}/>
                        <OverviewUpgradeIssues data={userIssuesData?.upgraded}/>
                        <OverviewFavoriteIssues data={userIssuesData?.favorite_issues}/>
                        <OverviewFavoriteTitles data={userIssuesData?.favorite_titles}/>
                    </>
            }
        </>
    )
}
