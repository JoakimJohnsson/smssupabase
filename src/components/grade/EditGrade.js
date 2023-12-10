import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {editGrade, removeGrade} from "../../services/collectingService";
import {useAppContext} from "../../context/AppContext";
import {GRADE_RADIOS, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {IconButton} from "../minis/IconButton";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";


export const EditGrade = ({grade, fetchGrades, issue, index}) => {

    const [radioValue, setRadioValue] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        setRadioValue(grade.grade);
    }, [grade.grade]);

    const handleEditGrade = (e) => {
        editGrade(grade.id, user.id, issue.id, e.target.value).then(() => fetchGrades());
    }

    const handleDeleteGrade = () => {
        removeGrade(grade.id, user.id, issue.id).then(() => fetchGrades());
    }

    return radioValue && (
        <div className={"border rounded-3 p-3 bg-dog mb-4"}>
            <h3 className={"mb-4"}>{LABELS_AND_HEADINGS.COPY} {index + 1}</h3>
            <ButtonGroup className={"mb-2 d-flex flex-wrap "}>
                {GRADE_RADIOS.map((radio, index) => {
                    const checked = radioValue.toString() === radio.value.toString();
                    return (
                        <div key={grade.id + index}>
                            <input
                                className="btn-check"
                                name="radio"
                                type="radio"
                                autoComplete="off"
                                id={`radio-${grade.id}-${index + 1}`}
                                value={radio.value}
                                checked={checked}
                                onChange={(e) => {
                                    handleEditGrade(e);
                                }}
                            />
                            <label tabIndex="0" htmlFor={`radio-${grade.id}-${index + 1}`} className={`p-0 sms-grade-btn ${checked ? "active" : ""}`}>
                                    <div className={`${checked ? "bg-dog text-grade-0" : "bg-elephant text-grade-200"} fs-small py-2 px-3 rounded-pill`}>
                                        <span aria-hidden={"true"} className={"d-inline-block text-nowrap"}>{radio.name} {radio.value.toFixed(1)}</span>
                                    </div>
                            </label>
                        </div>
                    )
                })}
            </ButtonGroup>
            <IconButton variant={"danger"} icon={faTrashCan} onClick={handleDeleteGrade} label={LABELS_AND_HEADINGS.DELETE_GRADE + " " + LABELS_AND_HEADINGS.COPY + " " +  (index + 1)}/>
        </div>
    )
}
