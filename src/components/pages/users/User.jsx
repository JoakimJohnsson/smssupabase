import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../../headings/index.jsx";
import {deleteAllTotalValuationValueForUserByUserId, getRowByTableAndId} from "../../../services/serviceFunctions.js";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {TEXTS} from "../../../helpers/constants/textConstants/texts.js";
import {MESSAGES} from "../../../helpers/constants/textConstants/messages.js";
import {TABLES} from "../../../helpers/constants/serviceConstants.js";
import {useParams} from "react-router-dom";
import {ImageViewerSmall} from "../pagecomponents/ImageViewerSmall.jsx";
import {OverlaySpinner} from "../../minis/OverlaySpinner.jsx";
import {
    getAnonDisplayName,
    getRandomProfileImage,
    getUserName,
    objectDoesExist,
    prepareUrl
} from "../../../helpers/functions.jsx";
import {NoDataAvailable} from "../../minis/NoDataAvailable.jsx";
import {useAppContext} from "../../../context/AppContext.jsx";
import {showFullInfo, updateProfileRole} from "../../../services/profileService.js";
import {AddAdminButton} from "../../lists/users/AddAdminButton.jsx";
import {RemoveAdminButton} from "../../lists/users/RemoveAdminButton.jsx";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {csvIconDuoTone, Icon, pdfIconDuoTone} from "../../icons/index.jsx";
import {FunctionButton} from "../../minis/FunctionButton.jsx";
import {faFaceExplode} from "@fortawesome/pro-duotone-svg-icons";
import {NoMatch} from "../../routes/NoMatch.jsx";
import {SimpleMessage} from "../../message/SimpleMessage.jsx";
import {getUserSelectedIssuesAndTitlesData} from "../../../helpers/databaseFunctions.js";
import {FavoriteTitles} from "./FavoriteTitles.jsx";
import {FavoriteIssues} from "./FavoriteIssues.jsx";
import {WantedIssues} from "./WantedIssues.jsx";
import {UpgradeIssues} from "./UpgradeIssues.jsx";
import {exportMissingIssuesForUser} from "../../../helpers/exportUtil.js";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {profile, setInformationMessage} = useAppContext();
    const [userSelectedIssuesTitlesData, setUserSelectedIssuesTitlesData] = useState(null);

    const fetchUserData = useCallback(() => {
        getRowByTableAndId(TABLES.PROFILES, setUser, id).then(() => setLoading(false));
    }, [id]);

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
            // Early exit
            if (!user.id) return;
            const result = await getUserSelectedIssuesAndTitlesData(user.id);
            if (result) {
                if (result.data) {
                    setUserSelectedIssuesTitlesData(result.data);
                }
            }
        };
        fetchIssuesData().then(() => setLoading(false));
    }, [user.id]);

    return objectDoesExist(user) && userSelectedIssuesTitlesData ?
        <>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        {
                            showFullInfo(user, profile) ?
                                <HeadingWithBreadCrumbs text={userName} doIgnoreName={true} bcName={userName}/>
                                :
                                <HeadingWithBreadCrumbs text={getAnonDisplayName(user)} doIgnoreName={true}
                                                        bcName={getAnonDisplayName(user)}/>
                        }
                        {
                            showFullInfo(user, profile) ?
                                <div className={"col-12 col-md-5 col-xl-4 mb-5"}>
                                    {
                                        <ImageViewerSmall url={user.image_url || getRandomProfileImage()}
                                                          fileName={userName}/>
                                    }
                                </div>
                                :
                                <NoDataAvailable isUser/>
                        }
                        {
                            showFullInfo(user, profile) &&
                            <div className={"col-12 col-md-7 col-xl-8"}>
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
                                <div className={"mb-3"}>
                                    <FunctionButton
                                        variant={"btn-outline-primary"}
                                        icon={csvIconDuoTone}
                                        onClick={() => exportMissingIssuesForUser(false, user)}
                                        label={LABELS.SECTIONS.ISSUES.EXPORT_MISSING_CSV}
                                        showLabel={true}
                                    />
                                    <FunctionButton
                                        variant={"btn-outline-primary"}
                                        icon={pdfIconDuoTone}
                                        onClick={() => exportMissingIssuesForUser(true, user)}
                                        label={LABELS.SECTIONS.ISSUES.EXPORT_MISSING_PDF}
                                        showLabel={true}
                                    />
                                </div>
                                <FavoriteIssues data={userSelectedIssuesTitlesData.favorite_issues}/>
                                <FavoriteTitles data={userSelectedIssuesTitlesData.favorite_titles}/>
                                <WantedIssues data={userSelectedIssuesTitlesData.wanted}/>
                                <UpgradeIssues data={userSelectedIssuesTitlesData.upgraded}/>
                            </div>
                        }
                    </>
            }
        </>
        :
        <NoMatch/>
}
