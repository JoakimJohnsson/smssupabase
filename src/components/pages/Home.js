import React, {useEffect, useState, useCallback} from "react";
import {CONFIG, LABELS_AND_HEADINGS, ROUTES, STATISTICS, TEXTS} from "../../helpers/constants/configConstants";
import {PANES} from "../../helpers/constants/textConstants/texts";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {InformationAlert} from "../minis/InformationAlert";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../services/serviceFunctions";
import {TitlesList} from "../lists/titles/TitlesList";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {getAllIssuesWithTitleAndPublisherWithLimit} from "../../services/issueService";
import {MessageViewer} from "../message/MessageViewer";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {atLeastOneListDoesExist} from "../../helpers/functions";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";
import {
    Icon,
    otherCollectionsIconDuoTone,
    overviewIconDuoTone,
    settingsIconDuoTone,
    titlesIconDuoTone,
    valueIconDuoTone,
} from "../icons";
import {IconLinkCtaLg} from "../minis/IconLinkCtaLg";
import {ImageViewerSmall} from "./pagecomponents/ImageViewerSmall";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import CustomProgressBar from "../CustomProgressBar";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const Home = () => {

    const {user, profile, activeGlobalMessages, unreadMessages, todoMessages} = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [totalTitles, setTotalTitles] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const [limitedIssuesData, setLimitedIssuesData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingUser(false);
        }, CONFIG.TIMEOUT_XXL);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setShowAlert(false);
        if (profile) {
            if (!profile.firstname || !profile.lastname || !profile.image_filename) {
                setShowAlert(true);
                setAlertText(TEXTS.ALERT_HOME_NAME_INFO);
            } else if (profile.is_public === 0) {
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
            setProgress(STATISTICS.TOTAL_TITLES_COUNT > 0 ? Math.round(totalTitles / STATISTICS.TOTAL_TITLES_COUNT * 100) : 0);
        }
    }, [totalTitles]);

    return profile && user && user.id ? (
            <main id="main-content" className={"container-fluid main-container dashboard"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col--full"}>
                        <div className={"mb-5"}>
                            <HeadingWithBreadCrumbs
                                text={LABELS_AND_HEADINGS.WELCOME_TEXT_1 + " " + profile.firstname + ", " + LABELS_AND_HEADINGS.WELCOME_TEXT_2}/>
                        </div>
                        <div className={"mb-4"}>
                            <div className={"sms-section--light"}>
                                {
                                    showAlert &&
                                    <InformationAlert variant={"info"} text={alertText}/>
                                }
                                <h2>{LABELS_AND_HEADINGS.YOUR_INFORMATION}</h2>

                                <div className={"row"}>
                                    <div className={"col-12 col-md-4"}>
                                        <ImageViewerSmall url={profile.image_url} fileName={profile.image_filename}/>
                                    </div>
                                    <div className={"col-12 col-md-8"}>
                                        <p className={"m-0"}><span
                                            className={"text-label me-4"}>{LABELS.SECTIONS.USERS.FIRST_NAME}:</span> {profile.firstname}</p>
                                        <p className={"m-0"}><span
                                            className={"text-label me-4"}>{LABELS.SECTIONS.USERS.LAST_NAME}:</span> {profile.lastname}</p>
                                        <p className={"m-0"}><span className={"text-label me-4"}>{LABELS.COMMON.WEBSITE}:</span> {profile.website}
                                        </p>
                                        <p className={"mb-4"}><span
                                            className={"text-label me-4"}>{LABELS.SECTIONS.USERS.IS_PUBLIC}:</span> {profile.is_public === 0 ? "Nej" : "Ja"}
                                        </p>
                                        <IconLinkCtaLg
                                            variant={"primary"}
                                            icon={settingsIconDuoTone}
                                            path={ROUTES.PROFILE}
                                            label={LABELS_AND_HEADINGS.SETTINGS}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>För frågor och förbättringsförslag:</p>
                        <p className={"mb-5"}>
                            <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                                admin@svenskamarvelsamlare.se
                            </a>
                        </p>
                        {
                            atLeastOneListDoesExist([activeGlobalMessages, unreadMessages, todoMessages]) &&
                            <div className={"mb-5"}>
                                <MessageViewer viewGlobal/>
                                {
                                    profile && profile.role > 0 &&
                                    <>
                                        <MessageViewer viewUnread/>
                                        <MessageViewer viewTodo/>
                                    </>
                                }
                            </div>
                        }
                        <h2>{LABELS.SECTIONS.DASHBOARD.NAME}</h2>
                        <IconLinkCtaLg
                            variant={"primary"}
                            icon={overviewIconDuoTone}
                            path={ROUTES.DASHBOARD.PATH_OVERVIEW}
                            label={PANES.OVERVIEW.NAME}
                        />
                        <IconLinkCtaLg
                            variant={"primary"}
                            icon={titlesIconDuoTone}
                            path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                            label={PANES.TITLES.NAME}
                        />
                        <IconLinkCtaLg
                            variant={"grade"}
                            icon={valueIconDuoTone}
                            path={ROUTES.DASHBOARD.PATH_VALUATION}
                            label={PANES.VALUATION.NAME}
                        />
                        <IconLinkCtaLg
                            variant={"country"}
                            icon={otherCollectionsIconDuoTone}
                            path={ROUTES.DASHBOARD.PATH_COLLECTIONS}
                            label={PANES.COLLECTIONS.NAME}
                        />
                    </div>
                </div>
                <div className={"row row-padding--secondary"}>
                    <div className={"col-12 mb-4"}>
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
                                            <CustomProgressBar label={progress + PANES.COLLECTIONS.COMPLETE} variant={"success"} valueNow={progress}/>
                                            :
                                            <CustomProgressBar label={progress > 10 ? totalTitles + " / " + STATISTICS.TOTAL_TITLES_COUNT : ""}
                                                               variant={"grade"} valueNow={progress}/>
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
                    <div className={"col-12 mb-4"}>
                        <h2>Publikationer</h2>
                        <p className={"mb-4 placeholder-glow"}><span className={"text-label"}>{TEXTS.TOTAL_ISSUE_COUNT}</span> {loading ?
                            <LazyTextPlaceholder charCount={4}/> : totalIssues}</p>
                        <h3 className={"mb-3"}>{TEXTS.LATEST_ISSUES}</h3>
                        {
                            limitedIssuesData ?
                                <ul className={"sms-list--with-cards"}>
                                    {
                                        limitedIssuesData
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
        loadingUser ?
            <div className={"row row-padding-main"}>
                <OverlaySpinner/>
            </div>
            :
            <>
                <HomePublic/>
                <Footer/>
            </>
}
