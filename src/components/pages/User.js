import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../../services/serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
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
                                    <div className={"col-12 col-lg-5 col-xl-3 mb-5"}>
                                        {
                                            user.image_url ?
                                                <ImageViewerLogo url={user.image_url} fileName={user.image_filename}/>
                                                :
                                                <img
                                                    src={marvel}
                                                    alt={userName}
                                                    className="w-100"
                                                />
                                        }
                                    </div>
                                    :
                                    <NoDataAvailable isUser/>
                            }
                            {
                                <div className={"col-12 col-lg-7 col-xl-9"}>
                                    {
                                        profile && profile.role === 2 && user.role !== 2 &&
                                        (
                                            user.role === 1 ?
                                                <RemoveAdminButton user={user} handleChangeAdmin={handleChangeAdmin} useTooltip={false}/>
                                                :
                                                <AddAdminButton user={user} handleChangeAdmin={handleChangeAdmin} useTooltip={false}/>
                                        )
                                    }
                                    <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                    <p className={"mb-4"}>
                                        {
                                            user.website ?
                                                <a href={prepareUrl(user.website)} target={"_blank"} rel="noreferrer">
                                                    {LABELS_AND_HEADINGS.MY_WEBSITE} <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                                :
                                                <p>{LABELS_AND_HEADINGS.INFORMATION_MISSING}</p>

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
                                                        <p>{user.firstname} {LABELS_AND_HEADINGS.NO_WANTED_ISSUES_USER}</p>
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
