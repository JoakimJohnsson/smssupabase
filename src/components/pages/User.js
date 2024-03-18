import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {deleteAllTotalValuationValueForUserByUserId, getRowByTableAndId} from "../../services/serviceFunctions";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {MESSAGES} from "../../helpers/constants/textConstants/messages";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {useParams} from "react-router-dom";
import {ImageViewerSmall} from "./pagecomponents/ImageViewerSmall";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAnonDisplayName, getUserName, prepareUrl, sortByName} from "../../helpers/functions";
import marvel from "../../assets/images/publishers/marvel.gif";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {useAppContext} from "../../context/AppContext";
import {showFullInfo, updateProfileRole} from "../../services/profileService";
import {AddAdminButton} from "../lists/users/AddAdminButton";
import {RemoveAdminButton} from "../lists/users/RemoveAdminButton";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";
import {CustomSpinner} from "../minis/CustomSpinner";
import {getWantedIssuesForUser} from "../../services/collectingService";
import {IssueLinkCard} from "../lists/issues/IssueLinkCard";
import {FunctionButton} from "../minis/FunctionButton";
import {faFaceExplode} from "@fortawesome/pro-duotone-svg-icons";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {profile, setInformationMessage} = useAppContext();
    const [wantedIssuesData, setWantedIssuesData] = useState(null);

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
            getWantedIssuesForUser(user.id, setWantedIssuesData).then(() => setLoading(false));
        }
    }, [user]);

    return (
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
                                                        <RemoveAdminButton user={user} handleChangeAdmin={handleChangeAdmin} useTooltip={false}/>
                                                        :
                                                        <AddAdminButton user={user} handleChangeAdmin={handleChangeAdmin} useTooltip={false}/>
                                                )
                                            }
                                            <FunctionButton
                                                variant={"danger"}
                                                icon={faFaceExplode}
                                                    onClick={handleDeleteValuationValues}
                                                label={LABELS_AND_HEADINGS.REMOVE_ALL_VALUATION_VALUES_FOR_USER}
                                            />
                                        </>
                                    }
                                    <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                    <p className={"mb-4"}>
                                        {
                                            user.website ?
                                                <a href={prepareUrl(user.website)} target={"_blank"} rel="noreferrer">
                                                    {LABELS_AND_HEADINGS.MY_WEBSITE} <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                                :
                                                <>{LABELS_AND_HEADINGS.INFORMATION_MISSING}</>
                                        }
                                    </p>
                                    <h2>{LABELS_AND_HEADINGS.WANTED_ISSUES}</h2>
                                    {
                                        loading ?
                                            <CustomSpinner size={"4x"}/>
                                            :
                                            <ul className={"sms-list--with-cards"}>
                                                {
                                                    wantedIssuesData ?
                                                        wantedIssuesData
                                                            .sort((a, b) => sortByName(a.titles, b.titles))
                                                            .map((issue, index) =>
                                                                <IssueLinkCard key={issue.id} issue={issue} index={index}/>
                                                            )
                                                        :
                                                        <p>{LABELS_AND_HEADINGS.NO_WANTED_ISSUES_USER}</p>
                                                }
                                            </ul>
                                    }
                                </div>
                            }
                        </>
                }
            </div>
        </main>
    )
}
