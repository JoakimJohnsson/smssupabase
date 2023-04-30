import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getUserName} from "../../helpers/functions/functions";
import marvel from "../../assets/images/publishers/marvel.gif";


export const User = () => {

    const [user, setUser] = useState({});
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

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


    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={userName} doIgnoreName={true} bcName={userName}/>
                            </div>
                            <div className={"col-12 col-md-4 col-lg-5 col-xl-3 mb-5"}>
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
                        </>
                }
            </div>
        </main>
    )
}
