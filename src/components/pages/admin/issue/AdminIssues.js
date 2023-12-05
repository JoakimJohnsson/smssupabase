import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking, sortByName} from "../../../../helpers/functions";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {getAllIssuesWithTitleAndPublisher} from "../../../../services/issueService";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";


export const AdminIssues = () => {

    const [issuesData, setIssuesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllIssuesWithTitleAndPublisher(setIssuesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_ISSUES}</h1>
                    <Breadcrumbs/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>

                                {
                                    issuesData
                                        .sort((a, b) => sortByName(a.titles, b.titles))
                                        .map((issue, index) =>
                                            <IssueLinkCard key={issue.id} issue={issue} index={index}/>
                                        )
                                }
                            </ul>
                    }
                    <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                label={LABELS_AND_HEADINGS.BACK}/>
                </div>
            </div>
        </main>
    )
}
