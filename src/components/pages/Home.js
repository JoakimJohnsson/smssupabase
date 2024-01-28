import React, {useEffect, useState, useCallback} from "react";
import {LABELS_AND_HEADINGS, PANES, ROUTES, STATISTICS, TABLES, TEXTS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {Icon} from "../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {InformationAlert} from "../minis/InformationAlert";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../services/serviceFunctions";
import {TitlesList} from "../lists/titles/TitlesList";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {getAllIssuesWithTitleAndPublisherWithLimit} from "../../services/issueService";
import {ProgressBar} from "react-bootstrap";
import {MessageViewer} from "../message/MessageViewer";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {sortByName} from "../../helpers/functions";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";
import {OtherCollectionsIconDuoTone, OverviewIconDuoTone, TitlesIconDuoTone} from "../icons-duotone";
import {Link} from "react-router-dom";


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
                        <p className={"mb-5"}>
                            <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                                admin@svenskamarvelsamlare.se
                            </a>
                        </p>
                        <div>
                            <Link to={ROUTES.DASHBOARD.PATH_OVERVIEW} className={"btn btn-primary btn-cta btn-cta__lg"}>
                                <OverviewIconDuoTone className={"btn-cta--icon"} size={"2x"}/>{PANES.OVERVIEW.NAME}
                            </Link>
                            <Link to={ROUTES.DASHBOARD.PATH_MY_TITLES} className={"btn btn-primary btn-cta btn-cta__lg"}>
                                <TitlesIconDuoTone className={"btn-cta--icon"} size={"2x"}/>{PANES.TITLES.NAME}
                            </Link>
                            <Link to={ROUTES.DASHBOARD.PATH_OTHER_COLLECTIONS} className={"btn btn-info btn-cta btn-cta__lg"}>
                                <OtherCollectionsIconDuoTone className={"btn-cta--icon"} size={"2x"}/>{PANES.OTHER_COLLECTIONS.NAME}
                            </Link>
                        </div>
                        <MessageViewer viewGlobal/>
                        {
                            profile && profile.role > 0 &&
                            <>
                                <MessageViewer viewUnread/>
                                <MessageViewer viewTodo/>
                            </>
                        }
                    </div>
                </div>
                <div className={"row row-padding--secondary"}>
                    <div className={"col-12 mb-4 col-x-padding--xs-only"}>
                        <h2>{LABELS_AND_HEADINGS.TITLES}</h2>
                        <p className={"mb-4 placeholder-glow"}><span className={"text-label"}>{TEXTS.TOTAL_TITLE_COUNT}</span> {loading ?
                            <LazyTextPlaceholder charCount={3}/> : totalTitles}</p>
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
                                            <ProgressBar striped variant={"grade"} now={progress}
                                                         label={progress > 10 ? totalTitles + " / " + STATISTICS.TOTAL_TITLES_COUNT : ""}/>
                                    }
                                </>
                            }
                        </div>
                        <h3>{TEXTS.LATEST_TITLES}</h3>
                        {
                            limitedTitlesData ?
                                <>
                                    <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} doSortByName={false} showCreatedInfo
                                                showToolbox={false}/>
                                </>
                                :
                                <NoDataAvailable/>
                        }
                    </div>
                    <div className={"col-12 mb-4 col-x-padding--xs-only"}>
                        <h2>Publikationer</h2>
                        <p className={"mb-4 placeholder-glow"}><span className={"text-label"}>{TEXTS.TOTAL_ISSUE_COUNT}</span> {loading ?
                            <LazyTextPlaceholder charCount={4}/> : totalIssues}</p>
                        <h3 className={"mb-3"}>{TEXTS.LATEST_ISSUES}</h3>
                        {
                            limitedIssuesData ?
                                <ul className={"sms-list--with-cards"}>

                                    {
                                        limitedIssuesData
                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                            .map((issue, index) =>
                                                <IssueLinkCard key={issue.id} issue={issue} index={index}/>
                                            )
                                    }
                                </ul>
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
