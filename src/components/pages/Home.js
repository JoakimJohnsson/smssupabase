import React, {useEffect, useState, useCallback} from "react";
import {LABELS_AND_HEADINGS, STATISTICS, TABLES, TEXTS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {Icon} from "../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {InformationAlert} from "../minis/InformationAlert";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../services/serviceFunctions";
import {CustomSpinner} from "../minis/CustomSpinner";
import {TitlesList} from "../lists/titles/TitlesList";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {getAllIssuesWithTitleAndPublisherWithLimit} from "../../services/issueService";
import {IssuesListSimple} from "../lists/issues/IssuesListSimple";
import {ProgressBar} from "react-bootstrap";
import {GlobalMessageViewer} from "../message/GlobalMessageViewer";


export const Home = () => {

    const {user, profile} = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [totalTitles, setTotalTitles] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const [limitedIssuesData, setLimitedIssuesData] = useState(null);

    useEffect(() => {
        if (profile) {
            if (!profile.firstname || !profile.lastname || !profile.image_filename) {
                setShowAlert(true);
                setAlertText(TEXTS.ALERT_HOME_NAME_INFO);
            } else if (!profile.is_public) {
                setShowAlert(true);
                setAlertText(TEXTS.ALERT_HOME_IS_PUBLIC_INFO);
            }
        }
    }, [profile]);

    const fetchData = useCallback(() => {
        getCountByTable(TABLES.TITLES, setTotalTitles).then(() => {
            getCountByTable(TABLES.ISSUES, setTotalIssues).then(() => setLoading(false));
        });
    }, []);

    useEffect(() => {
        if (user && user.id) {
            getRowsByTableWithLimitAndOrderByColumn(TABLES.TITLES, "created_at", setLimitedTitlesData, 10, false).then(() => {
                getAllIssuesWithTitleAndPublisherWithLimit(setLimitedIssuesData, 15, false).then(() => {
                    fetchData();
                });
            });
        }
    }, [fetchData, user]);


    useEffect(() => {
        if (totalTitles && totalTitles > 0) {
            setProgress(Math.round(totalTitles / STATISTICS.TOTAL_TITLES_COUNT * 100));
        }
    }, [totalTitles]);

    return user && user.id ? (
            <main id="main-content" className={"container-fluid main-container dashboard"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col--full"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.WELCOME}/>
                        {
                            showAlert &&
                            <InformationAlert variant={"info"} text={alertText}/>
                        }
                        <p className={"lead"}>Sidan är för tillfället under utveckling och genomgår nu olika stadier av utveckling, test och
                            kravställning.</p>
                        <p>För frågor och förbättringsförslag:</p>
                        <p>
                            <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                                admin@svenskamarvelsamlare.se
                            </a>
                        </p>
                        <GlobalMessageViewer />
                    </div>
                </div>
                <div className={"row row-padding--secondary"}>
                    <div className={"col-12 mb-4 col-x-padding--xs-only"}>
                        <h2>{LABELS_AND_HEADINGS.TITLES}</h2>
                        <p className={"mb-4"}><span className={"text-label"}>{TEXTS.TOTAL_TITLE_COUNT}</span> {loading ? <CustomSpinner/> : totalTitles}
                        </p>
                        <div className={"mb-4"}>
                            {
                                <>
                                    <p>
                                        {TEXTS.ADDING_TITLE_TEXT_1 + " " + progress + TEXTS.ADDING_TITLE_TEXT_2}
                                    </p>
                                    {
                                        progress === 100 ?
                                            <ProgressBar striped variant="success" now={progress}/>
                                            :
                                            <ProgressBar striped now={progress} label={progress > 10 ? totalTitles + " / " + STATISTICS.TOTAL_TITLES_COUNT : ""}/>
                                    }
                                </>
                            }
                        </div>
                        <h3>{TEXTS.LATEST_TITLES}</h3>
                        {
                            limitedTitlesData ?
                                <>
                                    <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} showCreatedInfo showToolbox={false}/>
                                </>
                                :
                                <NoDataAvailable/>
                        }
                    </div>
                    <div className={"col-12 mb-4 col-x-padding--xs-only"}>
                        <h2>Publikationer</h2>
                        <p className={"mb-4"}><span className={"text-label"}>{TEXTS.TOTAL_ISSUE_COUNT}</span> {loading ? <CustomSpinner/> : totalIssues}</p>
                        <h3 className={"mb-3"}>{TEXTS.LATEST_ISSUES}</h3>
                        {
                            limitedIssuesData ?
                                <>
                                    <IssuesListSimple issuesData={limitedIssuesData} showCollectingButtons={false}/>
                                </>
                                :
                                <NoDataAvailable/>
                        }
                    </div>
                </div>
            </main>
        )
        :
        <>
            <HomePublic/>
            <Footer/>
        </>
}
