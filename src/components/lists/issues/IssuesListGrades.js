import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {getDataGradeValueByGradeName, sortByNumberAndVariantSuffix} from "../../../helpers/functions";


export const IssuesListGrades = ({groupedIssuesData}) => {

    const renderGradeValue = (year, gradeName) => {
        const data = year[0].grade_values;
        const value = getDataGradeValueByGradeName(data, gradeName);
        return value > 0 ? value : "-";
    }

    return (
        <table className={"table table-sm table-responsive table-striped mb-4 mt-3"}>
            <caption>{LABELS_AND_HEADINGS.GRADE_VALUE_VALUES_FOR} {groupedIssuesData[0][0].titles.name}</caption>
            <thead>
            <tr>
                <th scope={"col"}>År / Nummer</th>
                <th scope={"col"}>GD</th>
                <th scope={"col"}>VG</th>
                <th scope={"col"}>FN</th>
                <th scope={"col"}>VF</th>
                <th scope={"col"}>NM</th>
            </tr>
            </thead>
            {
                groupedIssuesData.length &&
                (groupedIssuesData.map((year, index) =>
                        <tbody key={index}>
                        {
                            year.length ?
                                (year.sort((a, b) => sortByNumberAndVariantSuffix(a, b)).map((issue) =>
                                    <tr key={issue.id}>
                                        <th scope={"row"}>{year[0].year} {issue.number}</th>
                                        <td>{renderGradeValue(year, "GD")}</td>
                                        <td>{renderGradeValue(year, "VG")}</td>
                                        <td>{renderGradeValue(year, "FN")}</td>
                                        <td>{renderGradeValue(year, "VF")}</td>
                                        <td>{renderGradeValue(year, "NM")}</td>
                                    </tr>
                                ))
                                :
                                (<NoDataAvailable/>)
                        }
                        </tbody>)
                )
            }
        </table>
    )
}
