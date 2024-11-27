import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByTitleYearNumber} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";
import {ExportDataButton} from "../../minis/ExportDataButton.jsx";
import {getExportDataForIssues} from "../../../helpers/exportUtil.js";


export const FavoriteIssues = ({data}) => {

    const fileName = LABELS.SECTIONS.ISSUES.FAVORITE_ISSUES_FILENAME;
    const exportData = getExportDataForIssues(data);

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
            <ul className={"sms-list--with-cards"}>
                {
                    data ?
                        data
                            .sort((a, b) => sortByTitleYearNumber(a, b))
                            .map((issue) =>
                                <IssueLinkCard key={issue.id} issue={issue}
                                               variant={"marvelklubben"}/>
                            )
                        :
                        <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                }
            </ul>
            <ExportDataButton data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_CSV}
                              variant={"btn-outline-marvelklubben"}/>
            {/*<ExportDataButton doExportPdf data={data} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_PDF} variant={"btn-outline-marvelklubben"} />*/}
        </div>
    )
}
