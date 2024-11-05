import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {deleteAllTotalValuationValueForUserByUserId, getRowByTableAndId} from "../../services/serviceFunctions";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {MESSAGES} from "../../helpers/constants/textConstants/messages";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {useParams} from "react-router-dom";
import {ImageViewerSmall} from "./pagecomponents/ImageViewerSmall";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAnonDisplayName, getUserName, objectDoesExist, prepareUrl, sortByName} from "../../helpers/functions";
import marvel from "../../assets/images/publishers/marvel.gif";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {useAppContext} from "../../context/AppContext";
import {showFullInfo, updateProfileRole} from "../../services/profileService";
import {AddAdminButton} from "../lists/users/AddAdminButton";
import {RemoveAdminButton} from "../lists/users/RemoveAdminButton";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";
import {CustomSpinner} from "../minis/CustomSpinner";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";
import {FunctionButton} from "../minis/FunctionButton";
import {faFaceExplode} from "@fortawesome/pro-duotone-svg-icons";
import {NoMatch} from "../routes/NoMatch";
import {SimpleMessage} from "../message/SimpleMessage";
import {getUserSelectedIssuesAndTitlesData} from "../../helpers/databaseFunctions.js";
import {TitlesListItem} from "./TitlesListItem.jsx";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {profile, setInformationMessage} = useAppContext();
    const [userIssuesData, setUserIssuesData] = useState(null);

    const fetchUserData = useCallback(() => {
        getRowByTableAndId(TABLES.PROFILES, setUser, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (user && user.id) {
            setUserName(getUserName(user));
        }
    }, [user]);

    const handleChangeAdmin = (id, value, doSetLoading) => {
        doSetLoading(true);
        updateProfileRole(id, value, setInformationMessage).then(() => {
            fetchUserData();
            doSetLoading(false);
        });
    }

    const handleDeleteValuationValues = () => {
        if (!window.confirm(MESSAGES.CONFIRM.DELETE_VALUATION_VALUES)) {
            setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
            return false;
        }
        deleteAllTotalValuationValueForUserByUserId(user.id).then();
    }

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

    return objectDoesExist(user) && userIssuesData ? (
            <main id="main-content" className={"container-fluid main-container"}>
                <div className={"row row-padding--main"}>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <>
                                <div className={"sms-page-col"}>
                                    {
                                        showFullInfo(user, profile) ?
                                            <HeadingWithBreadCrumbs text={userName} doIgnoreName={true} bcName={userName}/>
                                            :
                                            <HeadingWithBreadCrumbs text={getAnonDisplayName(user)} doIgnoreName={true}
                                                                    bcName={getAnonDisplayName(user)}/>
                                    }
                                </div>
                                {
                                    showFullInfo(user, profile) ?
                                        <div className={"col-12 col-md-5 col-xl-3 mb-5"}>
                                            {
                                                <ImageViewerSmall url={user.image_url || marvel} fileName={userName}/>
                                            }
                                        </div>
                                        :
                                        <NoDataAvailable isUser/>
                                }
                                {
                                    showFullInfo(user, profile) &&
                                    <div className={"col-12 col-md-7 col-xl-9"}>
                                        {
                                            profile && profile.role === 2 &&
                                            <>
                                                {
                                                    user.role !== 2 &&
                                                    (
                                                        user.role === 1 ?
                                                            <RemoveAdminButton user={user}
                                                                               handleChangeAdmin={handleChangeAdmin}
                                                                               useTooltip={false}/>
                                                            :
                                                            <AddAdminButton user={user}
                                                                            handleChangeAdmin={handleChangeAdmin}
                                                                            useTooltip={false}/>
                                                    )
                                                }
                                                <FunctionButton
                                                    variant={"btn-outline-danger"}
                                                    icon={faFaceExplode}
                                                    onClick={handleDeleteValuationValues}
                                                    label={TEXTS.REMOVE_ALL_VALUATION_VALUES_FOR_USER}
                                                />
                                                <SimpleMessage user={user}/>
                                            </>
                                        }
                                        <h2>{LABELS.COMMON.INFORMATION}</h2>
                                        <p className={"mb-4"}>
                                            {
                                                user.website ?
                                                    <a href={prepareUrl(user.website)} target={"_blank"}
                                                       rel="noreferrer">
                                                        {LABELS.SECTIONS.USERS.MY_WEBSITE} <Icon
                                                        icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                    </a>
                                                    :
                                                    <>{LABELS.COMMON.INFORMATION_MISSING}</>
                                            }
                                        </p>
                                        <div className={"sms-section--light mb-5"}>
                                            <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
                                            {
                                                loading ?
                                                    <CustomSpinner size={"4x"}/>
                                                    :
                                                    <ul className={"sms-list--with-cards"}>
                                                        {
                                                            userIssuesData.favorite_issues ?
                                                                userIssuesData.favorite_issues
                                                                    .sort((a, b) => sortByName(a.titles, b.titles))
                                                                    .map((issue) =>
                                                                        <IssueLinkCard key={issue.id} issue={issue}
                                                                                       variant={"marvelklubben"}/>
                                                                    )
                                                                :
                                                                <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                                                        }
                                                    </ul>
                                            }
                                        </div>
                                        <div className={"sms-section--light mb-5"}>
                                            <h2>{LABELS.SECTIONS.TITLES.FAVORITES}</h2>
                                            {
                                                <ul className={"sms-list--with-cards"}>
                                                    {
                                                        userIssuesData.favorite_titles ?
                                                            userIssuesData.favorite_titles
                                                                .sort((a, b) => sortByName(a, b))
                                                                .map((title) =>
                                                                    <TitlesListItem key={title.id} title={title}/>
                                                                )
                                                            :
                                                            <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                                                    }
                                                </ul>
                                            }
                                        </div>
                                        <div className={"sms-section--light mb-5"}>
                                            <h2>{LABELS.COMMON.WANTED_ISSUES}</h2>
                                            {
                                                <ul className={"sms-list--with-cards"}>
                                                    {
                                                        userIssuesData.wanted ?
                                                            userIssuesData.wanted
                                                                .sort((a, b) => sortByName(a.titles, b.titles))
                                                                .map((issue) =>
                                                                    <IssueLinkCard key={issue.id} issue={issue}
                                                                                   variant={"publisher"}/>
                                                                )
                                                            :
                                                            <p>{LABELS.COMMON.NO_WANTED_ISSUES_USER}</p>
                                                    }
                                                </ul>
                                            }
                                        </div>
                                        <div className={"sms-section--light mb-5"}>
                                            <h2>{LABELS.SECTIONS.ISSUES.UPGRADE_ISSUES}</h2>
                                            {
                                                <ul className={"sms-list--with-cards"}>
                                                    {
                                                        userIssuesData.upgraded ?
                                                            userIssuesData.upgraded
                                                                .sort((a, b) => sortByName(a.titles, b.titles))
                                                                .map((issue) =>
                                                                    <IssueLinkCard key={issue.id} issue={issue}
                                                                                   variant={"grade"}/>
                                                                )
                                                            :
                                                            <p>{LABELS.COMMON.NO_UPGRADE_ISSUES_USER}</p>
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                }
                            </>
                    }
                </div>
            </main>
        )
        :
        <NoMatch/>
}
