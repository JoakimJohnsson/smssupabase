import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {getRowByTableAndId, getRowsByTableForeignKeyColumnAndForeignKeyId} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {useParams} from "react-router-dom";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import countryData from "../../helpers/valueLists/countries.json";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {TitlesList} from "../lists/titles/TitlesList";
import {CustomSpinner} from "../minis/CustomSpinner";
import {CountryBadge} from "../minis/CountryBadge";


export const Publisher = () => {

    const [publisher, setPublisher] = useState({});
    const [titlesData, setTitlesData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchPublisherAndTitlesData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => {
            getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.TITLES, "publisher_id", id, setTitlesData).then(() => setLoading(false));
        });
    }, [id])

    useEffect(() => {
        fetchPublisherAndTitlesData();
    }, [fetchPublisherAndTitlesData])


    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={publisher.name}/>
                            </div>
                            <div className={"col-12 col-md-4 col-lg-5 col-xl-3 mb-5"}>
                                <ImageViewerLogo url={publisher.image_url} fileName={publisher.image_filename}/>
                                <div className={"mb-2"}>
                                    {
                                        countryData &&
                                        <CountryBadge countryId={publisher.country_id}/>
                                    }
                                </div>
                                {
                                    publisher.description &&
                                    <p>{publisher.description}</p>
                                }
                                {
                                    publisher.wiki_url &&
                                    <p>
                                        <a href={publisher.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                            {LABELS_AND_HEADINGS.SERIEWIKIN_FOR} {publisher.name}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    </p>
                                }
                            </div>
                            <div className={"col-12 col-md-8 col-lg-7 col-xl-6 mb-4"}>
                                <h2>{LABELS_AND_HEADINGS.TITLES}</h2>

                                {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={false}/> :
                                    <CustomSpinner/>}
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
