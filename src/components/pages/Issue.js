import React from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {CustomSpinner} from "../minis/CustomSpinner";
import {getIssueName, getObjectNameById} from "../../helpers/functions/functions";
import {ImageViewer} from "./pagecomponents/ImageViewer";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";


export const Issue = () => {

    const {id} = useParams();

    const [
        issue,
        title,
        publisher,
        loading
    ] = useIssueData(id);

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <CustomSpinner size={"4x"}/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} bcName={getIssueName(title, issue)}/>
                            </div>
                            <div className={"col-12 col-md-4 col-xl-3 mb-5"}>
                                <ImageViewer url={issue.image_url} fileName={issue.image_filename}/>
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <div className={"row"}>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <Link to={`/publishers/${publisher.id}`} title={publisher.name}>
                                            <ImageViewer url={publisher.image_url} fileName={publisher.image_filename}/>
                                        </Link>
                                    </div>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <Link to={`/titles/${title.id}`} title={title.name}>
                                            <ImageViewer url={title.image_url} fileName={title.image_filename}/>
                                        </Link>
                                    </div>
                                </div>
                                <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                {
                                    countryData &&
                                    <p>{LABELS_AND_HEADINGS.COUNTRY}: {getObjectNameById(countryData, publisher.country_id)}</p>
                                }
                                {
                                    issue.is_marvelklubben === 1 &&
                                    <p>{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER}: {issue.marvelklubben_number}</p>
                                }
                                <p>{title.description}</p>
                                <p>{publisher.description}</p>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
