import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByTitleYearNumber} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";
import {ExportDataButton} from "../../minis/ExportDataButton.jsx";
import {getExportDataForIssues} from "../../../helpers/exportUtil.js";
import {SmsListWithCards} from "../pagecomponents/SmsListWithCards.jsx";


export const FavoriteIssues = ({data}) => {

    const fileName = LABELS.SECTIONS.ISSUES.FAVORITE_ISSUES_FILENAME;
    const exportData = getExportDataForIssues(data);

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.ISSUES.FAVORITES}</h2>
            <SmsListWithCards>
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
            </SmsListWithCards>
            <ExportDataButton data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_CSV}
                              variant={"btn-outline-marvelklubben"}/>
            <ExportDataButton doExportPdf data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_FAVORITES_PDF} variant={"btn-outline-marvelklubben"} />
        </div>
    )
}
