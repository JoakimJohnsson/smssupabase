import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {CustomSpinner} from "../minis/CustomSpinner";
import {ImageViewer} from "./pagecomponents/ImageViewer";


export const Publisher = () => {

    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchPublisherData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchPublisherData();
    }, [fetchPublisherData])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <CustomSpinner size={"4x"}/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={publisher.name}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3"}>
                                <ImageViewer url={publisher.image_url} fileName={publisher.image_filename}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
