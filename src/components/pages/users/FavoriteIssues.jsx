import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByName} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";
import {ExportDataButton} from "../../minis/ExportDataButton.jsx";


export const FavoriteIssues = ({data}) => {

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
            <ul className={"sms-list--with-cards"}>
                {
                    data.favorite_issues ?
                        data.favorite_issues
                            .sort((a, b) => sortByName(a.titles, b.titles))
                            .map((issue) =>
                                <IssueLinkCard key={issue.id} issue={issue}
                                               variant={"marvelklubben"}/>
                            )
                        :
                        <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                }
            </ul>
            <ExportDataButton data={data} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_CSV} variant={"btn-outline-marvelklubben"} />
            <ExportDataButton doExportPdf data={data} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_PDF} variant={"btn-outline-marvelklubben"} />
        </div>
    )
}
