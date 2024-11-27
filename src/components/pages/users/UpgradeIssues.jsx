import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByTitleYearNumber} from "../../../helpers/functions.jsx";
import {IssueLinkCard} from "../../lists/issues/IssueLinkCard.jsx";
import {ExportDataButton} from "../../minis/ExportDataButton.jsx";
import {getExportDataForIssues} from "../../../helpers/exportUtil.js";


export const UpgradeIssues = ({data}) => {

    const fileName = LABELS.SECTIONS.ISSUES.UPGRADE_ISSUES_FILENAME;
    const exportData = getExportDataForIssues(data);

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.ISSUES.UPGRADE_ISSUES}</h2>
            {
                <ul className={"sms-list--with-cards"}>
                    {
                        data ?
                            data
                                .sort((a, b) => sortByTitleYearNumber(a, b))
                                .map((issue) =>
                                    <IssueLinkCard key={issue.id} issue={issue}
                                                   variant={"grade"}/>
                                )
                            :
                            <p>{LABELS.COMMON.NO_UPGRADE_ISSUES_USER}</p>
                    }
                </ul>
            }
            <ExportDataButton data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_UPGRADE_CSV}
                              variant={"btn-outline-grade"}/>
            <ExportDataButton doExportPdf data={exportData} fileName={fileName} label={LABELS.SECTIONS.ISSUES.EXPORT_UPGRADE_PDF} variant={"btn-outline-grade"} />
        </div>
    )
}
