import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {EditGrade} from "./EditGrade";

export const Grade = ({issue, grade, setGrade}) => {

    return !!grade && (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS_AND_HEADINGS.GRADE}</h2>
            <EditGrade grade={grade} setGrade={setGrade} issue={issue}/>
        </div>
    )
}
