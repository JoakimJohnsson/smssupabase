import React, {useEffect, useState, useCallback} from "react";
import {CONFIG, ROUTES, STATISTICS} from "../../../helpers/constants/configConstants";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {PANES, TEXTS} from "../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../helpers/constants/serviceConstants";
import {useAppContext} from "../../../context/AppContext";
import {HomePublic} from "./HomePublic";
import {InformationAlert} from "../../minis/InformationAlert";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../services/serviceFunctions";
import {TitlesList} from "../../lists/titles/TitlesList";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {getAllIssuesWithTitleAndPublisherWithLimit} from "../../../services/issueService";
import {MessageViewer} from "../../message/MessageViewer";
import {LazyTextPlaceholder} from "../../minis/LazyTextPlaceholder";
import {atLeastOneListDoesExist} from "../../../helpers/functions";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard";
import {Icon, mailIcon, settingsIconDuoTone, userIconDuoTone} from "../../icons/Icons.jsx";
import {IconLinkCtaLg} from "../../minis/IconLinkCtaLg";
import {ImageViewerSmall} from "../pagecomponents/ImageViewerSmall";
import CustomProgressBar from "../../CustomProgressBar";
import {OverlaySpinner} from "../../minis/OverlaySpinner";
import {DashboardSection} from "./DashboardSection";
import {getTop5Issues, getTop5Titles} from "../../../helpers/databaseFunctions.js";
import {TitlesListItem} from "../titles/TitlesListItem.jsx";
import SearchBox from "../../SearchBox.jsx";
import {SmsListWithCards} from "../pagecomponents/SmsListWithCards.jsx";
import {PageMainContent} from "../pagecomponents/PageMainContent.jsx";


export const Home = () => {

    const {user, profile, activeGlobalMessages, unreadMessages, todoMessages, userMessages} = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [totalTitles, setTotalTitles] = useState(0);
    const [totalIssues, setTotalIssues] = useState(0);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingUser, setLoadingUser] = useState(true);
    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const [limitedIssuesData, setLimitedIssuesData] = useState(null);
    const [top5Issues, setTop5Issues] = useState(null);
    const [top5Titles, setTop5Titles] = useState(null);
    const hasProfileImage = profile && profile.image_filename && profile.image_url;

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
            getRowsByTableWithLimitAndOrderByColumn(TABLES.TITLES, "created_at", setLimitedTitlesData, 5, false).then(() => {
                getAllIssuesWithTitleAndPublisherWithLimit(setLimitedIssuesData, 6, false).then(() => {
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

    useEffect(() => {
        const fetchIssues = async () => {
            const result = await getTop5Issues();
            if (result) {
                if (result.data) {
                    setTop5Issues(result.data);
                }
            }
        };
        const fetchTitles = async () => {
            const result = await getTop5Titles();
            if (result) {
                if (result.data) {
                    setTop5Titles(result.data);
                }
            }
        };
        fetchIssues();
        fetchTitles();
    }, []);

    return profile && user && user.id ?
        <PageMainContent heading={TEXTS.WELCOME_TEXT_1 + " " + profile.firstname + ", " + TEXTS.WELCOME_TEXT_2}>
            {
                userMessages && !!userMessages.length &&
                <InformationAlert variant={"success"}
                                  text={"Du har fått ett personligt meddelanden - gå till kontrollpanelens översikt för att läsa!"}/>
            }
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
            <div className={"sms-section--light mb-5"}>
                {
                    showAlert &&
                    <InformationAlert variant={"info"} text={alertText}/>
                }
                <div className={"row"}>
                    <div className={"col-12"}>
                        <IconLinkCtaLg
                            variant={"warning"}
                            icon={userIconDuoTone}
                            path={`/users/${profile.id}`}
                            label={LABELS.COMMON.YOUR_PAGE}
                        />
                    </div>
                    <div className={"col-12 mb-4"}>
                        <DashboardSection/>
                    </div>
                    {
                        hasProfileImage &&
                        <div className={"col-12 col-md-4"}>
                            <ImageViewerSmall url={profile.image_url} fileName={profile.image_filename}/>
                        </div>
                    }
                    <div className={"col-12 col-md-8"}>
                        <h2>{LABELS.COMMON.YOUR_INFORMATION}</h2>
                        <IconLinkCtaLg
                            variant={"primary"}
                            icon={settingsIconDuoTone}
                            path={ROUTES.PROFILE}
                            label={LABELS.COMMON.SETTINGS}
                        />
                        <p className={"m-0"}><span
                            className={"text-label"}>{LABELS.SECTIONS.USERS.FIRST_NAME}:</span> {profile.firstname}
                        </p>
                        <p className={"m-0"}><span
                            className={"text-label"}>{LABELS.SECTIONS.USERS.LAST_NAME}:</span> {profile.lastname}
                        </p>
                        <p className={"m-0"}><span
                            className={"text-label"}>{LABELS.COMMON.WEBSITE}:</span> {profile.website}
                        </p>
                        <p className={"m-0"}><span
                            className={"text-label"}>{LABELS.SECTIONS.USERS.IS_PUBLIC}:</span> {profile.is_public === 0 ? "Nej" : "Ja"}
                        </p>
                        <p className={"mb-4"}><span
                            className={"text-label"}>{LABELS.SECTIONS.USERS.ALLOW_LOCATION_ACCESS}:</span> {profile.allow_location_access === 0 ? "Nej" : "Ja"}
                        </p>
                        <p>För frågor och förbättringsförslag:</p>
                        <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                            <Icon icon={mailIcon} className={"me-2"}/>
                            admin@svenskamarvelsamlare.se
                        </a>
                    </div>
                </div>
            </div>
            <div className={"sms-section--light mb-5"}>
                <h2>{LABELS.SECTIONS.TITLES.TITLES}</h2>
                <SearchBox route={ROUTES.TITLES} placeholder={TEXTS.SEARCH_TITLE_OR_YEAR}
                           label={LABELS.SECTIONS.TITLES.TITLES}/>
                <div className={"mb-4"}>
                    {
                        <>
                            <p>
                                {TEXTS.ADDING_TITLE_TEXT_1 + " " + progress + TEXTS.ADDING_TITLE_TEXT_2}
                            </p>
                            {
                                progress === 100 ?
                                    <CustomProgressBar label={progress + PANES.COLLECTIONS.COMPLETE}
                                                       variant={"success"} valueNow={progress}/>
                                    :
                                    <CustomProgressBar
                                        label={progress > 10 ? totalTitles + " / " + STATISTICS.TOTAL_TITLES_COUNT : ""}
                                        variant={"primary"} valueNow={progress}/>
                            }
                        </>
                    }
                </div>
                <p className={"mb-4 placeholder-glow"}><span
                    className={"text-label"}>{TEXTS.TOTAL_TITLE_COUNT}</span> {loading ?
                    <LazyTextPlaceholder charCount={3}/> : totalTitles}</p>

                <p className={"text-label"}>{LABELS.SECTIONS.TITLES.TOP_5}</p>
                <SmsListWithCards>
                    {
                        top5Titles &&
                        top5Titles.map((title) => <TitlesListItem key={title.id} title={title}/>)
                    }
                </SmsListWithCards>
                <p className={"text-label"}>{TEXTS.LATEST_TITLES}</p>
                {
                    limitedTitlesData ?
                        <>
                            <TitlesList titlesData={limitedTitlesData}
                                        setTitlesData={setLimitedTitlesData}
                                        doSortByName={false} showCreatedInfo
                                        showToolbox={false}/>
                        </>
                        :
                        <NoDataAvailable/>
                }
            </div>
            <div className={"sms-section--light mb-5"}>
                <h2>{LABELS.SECTIONS.ISSUES.ISSUES}</h2>
                <SearchBox route={ROUTES.ISSUES} placeholder={TEXTS.SEARCH_NUMBER_TITLE_OR_YEAR}
                           label={LABELS.SECTIONS.ISSUES.ISSUES}/>
                <p className={"mb-4 placeholder-glow"}><span
                    className={"text-label"}>{TEXTS.TOTAL_ISSUE_COUNT}</span> {loading ?
                    <LazyTextPlaceholder charCount={4}/> : totalIssues}</p>
                <p className={"text-label"}>{LABELS.SECTIONS.ISSUES.TOP_5}</p>
                <SmsListWithCards>
                    {
                        top5Issues &&
                        top5Issues.map((issue) => <IssueLinkCard key={issue.id} issue={issue}/>)
                    }
                </SmsListWithCards>
                <p className={" text-label mb-3"}>{TEXTS.LATEST_ISSUES}</p>
                {
                    limitedIssuesData ?
                        <SmsListWithCards>
                            {
                                limitedIssuesData
                                    .map((issue) =>
                                        <IssueLinkCard key={issue.id} issue={issue}/>
                                    )
                            }
                        </SmsListWithCards>
                        :
                        <NoDataAvailable/>
                }
            </div>
        </PageMainContent>
        :
        loadingUser ?
            <div className={"row row-padding-main"}>
                <OverlaySpinner/>
            </div>
            :
            <>
                <HomePublic/>
            </>
}
