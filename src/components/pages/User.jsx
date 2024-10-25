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
import {getUpgradeIssuesForUser, getWantedIssuesForUser} from "../../services/collectingService";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";
import {FunctionButton} from "../minis/FunctionButton";
import {faFaceExplode} from "@fortawesome/pro-duotone-svg-icons";
import {NoMatch} from "../routes/NoMatch";
import {SimpleMessage} from "../message/SimpleMessage";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {profile, setInformationMessage} = useAppContext();
    const [wantedIssuesData, setWantedIssuesData] = useState(null);
    const [upgradeIssuesData, setUpgradeIssuesData] = useState(null);

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
        if (user && user.id) {
            getWantedIssuesForUser(user.id, setWantedIssuesData).then(() => {
                getUpgradeIssuesForUser(user.id, setUpgradeIssuesData).then(() => setLoading(false));
            });

        }
    }, [user]);

    return objectDoesExist(user) ? (
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
                                                    variant={"danger"}
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
                                            <h2>{LABELS.COMMON.WANTED_ISSUES}</h2>
                                            {
                                                loading ?
                                                    <CustomSpinner size={"4x"}/>
                                                    :
                                                    <ul className={"sms-list--with-cards"}>
                                                        {
                                                            wantedIssuesData ?
                                                                wantedIssuesData
                                                                    .sort((a, b) => sortByName(a.titles, b.titles))
                                                                    .map((issue) =>
                                                                        <IssueLinkCard key={issue.id} issue={issue}/>
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
                                                loading ?
                                                    <CustomSpinner size={"4x"}/>
                                                    :
                                                    <ul className={"sms-list--with-cards"}>
                                                        {
                                                            upgradeIssuesData ?
                                                                upgradeIssuesData
                                                                    .sort((a, b) => sortByName(a.titles, b.titles))
                                                                    .map((issue) =>
                                                                        <IssueLinkCard key={issue.id} issue={issue}/>
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
