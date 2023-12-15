import React from "react";
import {GRADE_RADIOS, LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {isTrue} from "../../../../helpers/functions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";


export const AdminIssueGradeValueEdit = ({issue, title}) => {

    // TODO - W.I.P

    const [searchParams, setSearchParams] = useSearchParams({editgradevalue: false})
    const navigate = useNavigate();
    const editGradeValue = isTrue(searchParams.get("editgradevalue"));

    const handleSubmit = () => {
        console.log("UpdateIssueGradeValues");
    }
    const handleAbort = () => {
        setSearchParams({editgradevalue: false});
        console.log("Reset form ???");
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.EDIT_GRADE_VALUE}</h2>
                {GRADE_RADIOS.map((gradeValue) => {
                    return <p>{gradeValue.value.toFixed(1)}</p>;
                })}
                {
                    editGradeValue ?
                        <>
                            <button onClick={handleSubmit} className={"btn btn-primary sms-btn"}>
                                {LABELS_AND_HEADINGS.SAVE}
                            </button>
                            <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                {LABELS_AND_HEADINGS.ABORT}
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => setSearchParams({editgradevalue: true})} className={"btn btn-primary sms-btn"}>
                                {LABELS_AND_HEADINGS.EDIT}
                            </button>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                        label={LABELS_AND_HEADINGS.BACK_TO + " " + title.name}/>
                        </>
                }
            </div>
        </div>
    )
}
