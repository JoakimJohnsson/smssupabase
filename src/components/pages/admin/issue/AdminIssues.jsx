import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {handleBacking, sortByName} from "../../../../helpers/functions";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {getAllIssuesWithTitleAndPublisher} from "../../../../services/issueService";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {IssueLinkCard} from "../../../lists/issues/IssueLinkCard";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


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
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.ISSUES.ALL_ISSUES}/>
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
                                label={LABELS.COMMON.BACK}/>
                </div>
            </div>
        </main>
    )
}
