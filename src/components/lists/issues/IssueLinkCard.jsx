import React from "react";
import {Link} from "react-router-dom";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";
import {hasImage} from "../../../helpers/functions";
import {GradeBadge} from "../../grade/GradeBadge.jsx";


export const IssueLinkCard = ({issue, simple = false, admin = false, variant = "warning"}) => {

    const {displayName} = useIssueDisplayName(issue);
    const issuePath = admin ? "/admin/issues/" : "/issues/";

    return issue && (
        <li className={simple ? "issue-link-card simple" : "issue-link-card"}>
            <div>
                <Link to={`${issuePath}${issue.id}`} title={displayName}>
                    <div className={`bg-${variant} issue-link-card--content d-flex align-items-center h-100`}>
                        {
                            hasImage(issue) &&
                            <img src={issue.image_url} className={"list-image border-0 list-image--large me-2"}
                                 alt={""}/>
                        }
                        <span className={"p-2"}>{displayName}</span>

                    </div>
                </Link>
                {
                    issue.grades &&
                    <div>
                        {
                            issue.grades?.map((g, index) => {
                                return (
                                    <GradeBadge key={g.grade} grade={g.grade} index={index} small/>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </li>
    )
}
