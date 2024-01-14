import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {renderGradeValue, sortByNumberAndVariantSuffix} from "../../../helpers/functions";
import {Link} from "react-router-dom";


export const IssuesListGrades = ({groupedIssuesData}) => {


    return (
        <table className={"table table-sm table-responsive table-striped mt-3"}>
            <caption>{LABELS_AND_HEADINGS.GRADE_VALUES_FOR} <Link to={`/titles/${groupedIssuesData[0][0].titles.id}`}>{groupedIssuesData[0][0].titles.name}</Link></caption>
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
                                (year.sort((a, b) => sortByNumberAndVariantSuffix(a, b)).map((issue, index) =>
                                    <tr key={issue.id}>
                                        <th scope={"row"}>{year[0].year} {issue.number}</th>
                                        <td>{renderGradeValue(year[index], "GD")}</td>
                                        <td>{renderGradeValue(year[index], "VG")}</td>
                                        <td>{renderGradeValue(year[index], "FN")}</td>
                                        <td>{renderGradeValue(year[index], "VF")}</td>
                                        <td>{renderGradeValue(year[index], "NM")}</td>
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
