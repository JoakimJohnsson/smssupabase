import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const User = () => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchUserData = useCallback(() => {
        getRowByTableAndId(TABLES.PROFILES, setUser, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData])


    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={user.firstname + " " + user.lastname}/>
                            </div>
                            <div className={"col-12 col-md-4 col-lg-5 col-xl-3 mb-5"}>
                                <ImageViewerLogo url={user.image_url} fileName={user.image_filename}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
