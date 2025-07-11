import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import {OverviewTitlesSection} from "./OverviewTitlesSection.jsx";
import {OverviewIssuesSection} from "./OverviewIssuesSection.jsx";
import {OverviewUpgradeIssuesSection} from "./OverviewUpgradeIssuesSection.jsx";
import {OverviewWantedIssuesSection} from "./OverviewWantedIssuesSection.jsx";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverviewValuationSection} from "./OverviewValuationSection.jsx";
import {getCollectedIssuesWithTitlesForUser} from "../../../../services/collectingService";
import {OverviewLinksSection} from "./OverviewLinksSection.jsx";
import {OverviewMessagesSection} from "./OverviewMessagesSection.jsx";
import {getUserSelectedIssuesAndTitlesData} from "../../../../helpers/databaseFunctions.js";
import {OverviewFavoriteIssuesSection} from "./OverviewFavoriteIssuesSection.jsx";
import {OverviewFavoriteTitlesSection} from "./OverviewFavoriteTitlesSection.jsx";
import {OverlaySpinner} from "../../../minis/OverlaySpinner.jsx";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [userCollectedIssuesData, setUserCollectedIssuesData] = useState(null);
    const [userSelectedIssuesTitlesData, setUserSelectedIssuesTitlesData] = useState(null);
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
                    setUserSelectedIssuesTitlesData(result.data);
                }
            }
        };
        fetchIssuesData().then(() => setLoading(false));
    }, [user.id]);

    return (
        <>
            <HeadingWithBreadCrumbs text={PANES.OVERVIEW.NAME}/>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <OverviewLinksSection/>
                        <OverviewMessagesSection/>
                        <OverviewTitlesSection titlesData={userTitlesData}/>
                        <OverviewIssuesSection titlesData={userTitlesData} issuesData={userCollectedIssuesData}/>
                        <OverviewValuationSection/>
                        <OverviewWantedIssuesSection data={userSelectedIssuesTitlesData?.wanted}/>
                        <OverviewUpgradeIssuesSection data={userSelectedIssuesTitlesData?.upgraded}/>
                        <OverviewFavoriteIssuesSection data={userSelectedIssuesTitlesData?.favorite_issues}/>
                        <OverviewFavoriteTitlesSection data={userSelectedIssuesTitlesData?.favorite_titles}/>
                    </>
            }
        </>
    )
}
