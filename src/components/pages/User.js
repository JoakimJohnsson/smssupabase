import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAnonDisplayName, getUserName} from "../../helpers/functions/functions";
import marvel from "../../assets/images/publishers/marvel.gif";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {Logger} from "../minis/Logger";
import {useAppContext} from "../../context/AppContext";
import {showFullInfo, updateProfileRole} from "../../helpers/functions/serviceFunctions/profileFunctions";
import {AddAdminButton} from "../lists/users/AddAdminButton";
import {RemoveAdminButton} from "../lists/users/RemoveAdminButton";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {profile, setInformationMessage} = useAppContext();

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
                                    <div className={"col-12 col-md-4 col-xl-3 mb-4"}>
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
                                <div className={"col-12 col-md-8 col-xl-6"}>
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
                                    <p>Text</p>
                                    <h2>{LABELS_AND_HEADINGS.MY_COLLECTION}</h2>
                                    <p>Text</p>
                                    <Logger log={user} stringify={true}/>
                                    <Logger log={profile} stringify={true}/>
                                </div>
                            }

                        </>
                }
            </div>
        </main>
    )
}
