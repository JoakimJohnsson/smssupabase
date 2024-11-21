import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByName} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";


export const UpgradeIssues = ({data}) => {

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.ISSUES.UPGRADE_ISSUES}</h2>
            {
                <ul className={"sms-list--with-cards"}>
                    {
                        data.upgraded ?
                            data.upgraded
                                .sort((a, b) => sortByName(a.titles, b.titles))
                                .map((issue) =>
                                    <IssueLinkCard key={issue.id} issue={issue}
                                                   variant={"grade"}/>
                                )
                            :
                            <p>{LABELS.COMMON.NO_UPGRADE_ISSUES_USER}</p>
                    }
                </ul>
            }
        </div>
    )
}
