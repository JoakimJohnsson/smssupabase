import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByTitleYearNumber} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";
import {ExportDataButton} from "../../minis/ExportDataButton.jsx";
import {getExportDataForIssues} from "../../../helpers/exportUtil.js";
import {SmsListWithCards} from "../pagecomponents/SmsListWithCards.jsx";


export const WantedIssues = ({data}) => {

    const fileName = LABELS.SECTIONS.ISSUES.WANTED_ISSUES_FILENAME;
    const exportData = getExportDataForIssues(data);

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.COMMON.WANTED_ISSUES}</h2>
            {
                <SmsListWithCards>
                    {
                        data ?
                            data
                                .sort((a, b) => sortByTitleYearNumber(a, b))
                                .map((issue) =>
                                    <IssueLinkCard key={issue.id} issue={issue}
                                                   variant={"publisher"}/>
                                )
                            :
                            <p>{LABELS.COMMON.NO_WANTED_ISSUES_USER}</p>
                    }
                </SmsListWithCards>
            }
            <ExportDataButton data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_WANTED_CSV}
                              variant={"btn-outline-publisher"}/>
            <ExportDataButton doExportPdf data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_WANTED_PDF} variant={"btn-outline-publisher"} />
        </div>
    )
}
