import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {EditGrade} from "./EditGrade";

export const Grade = ({issue, grade, setGrade}) => {

    return !!grade && (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS_AND_HEADINGS.GRADE}</h2>
            <p>{TEXTS.GRADE_TEXT_2} <a href="https://seriekatalogen.se/grades/index.html" rel="noreferrer" target={"_blank"}>Seriekatalogen</a>.</p>
            <EditGrade grade={grade} setGrade={setGrade} issue={issue}/>
        </div>
    )
}
