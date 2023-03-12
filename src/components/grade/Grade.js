import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {GradeBadge} from "./GradeBadge";
import {EditGradeBadge} from "./EditGradeBadge";

export const Grade = ({issue}) => {

    const [edit, setEdit] = useState(false);
    const [grade, setGrade] = useState(3);

    return (
        <>
            <p className={"text-label mb-1"}>{LABELS_AND_HEADINGS.GRADE}</p>
            {edit ?
                <EditGradeBadge />
                :
                <GradeBadge grade={grade}/>
            }
            <button onClick={() => setEdit(!edit)} className={`${edit ? "btn btn-secondary" : "btn btn-primary"} sms-btn btn-sm`}>
                {edit ? LABELS_AND_HEADINGS.ABORT : LABELS_AND_HEADINGS.EDIT_GRADE}
            </button>
        </>
    )
}
