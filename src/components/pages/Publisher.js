import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId} from "../serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {Spinner} from "../minis/Spinner";


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
                        <Spinner size={"4x"}/>
                        :
                        <div className={"sms-page-col"}>
                            <HeadingWithBreadCrumbs text={publisher.name}/>
                        </div>
                }
            </div>
        </main>
    )
}
