import React, {useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getIssueName} from "../../helpers/functions/functions";
import {ImageViewer} from "./pagecomponents/ImageViewer";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {Grade} from "../grade/Grade";
import {FormatBadge} from "../minis/FormatBadge";
import {CountryBadge} from "../minis/CountryBadge";
import {GradeBadge} from "../grade/GradeBadge";


export const Issue = () => {

    const {id} = useParams();
    const [grade, setGrade] = useState(3);

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
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} bcName={getIssueName(title, issue)}/>
                            </div>
                            <div className={"col-12 col-md-4 col-xl-3 mb-5"}>
                                <ImageViewer url={issue.image_url} fileName={issue.image_filename}/>
                                <Grade issue={issue} grade={grade} setGrade={setGrade}/>
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <div className={"row mb-4"}>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <p className={"text-label mb-1"}>{LABELS_AND_HEADINGS.PUBLISHERS}</p>
                                        <Link to={`/publishers/${publisher.id}`} title={publisher.name}>
                                            <ImageViewer url={publisher.image_url} fileName={publisher.image_filename}/>
                                        </Link>
                                    </div>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <p className={"text-label mb-1"}>{LABELS_AND_HEADINGS.TITLE}</p>
                                        <Link to={`/titles/${title.id}`} title={title.name}>
                                            <ImageViewer url={title.image_url} fileName={title.image_filename}/>
                                        </Link>
                                    </div>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>

                                    </div>
                                </div>
                                <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                <div className={"d-flex align-items-center"}>
                                    <GradeBadge grade={4}/>
                                    <FormatBadge formatId={title.format_id}/>
                                    {
                                        countryData &&
                                        <CountryBadge countryId={publisher.country_id}/>
                                    }
                                </div>
                                {
                                    issue.is_marvelklubben === 1 &&
                                    <p>{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER}: {issue.marvelklubben_number}</p>
                                }
                                <p>{title.description}</p>
                                <p>{publisher.description}</p>
                                {
                                    title.wiki_url &&
                                    <p>
                                        <a href={title.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                            {LABELS_AND_HEADINGS.SERIEWIKIN_FOR} {title.name}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    </p>
                                }
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
