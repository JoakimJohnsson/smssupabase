import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {editGrade, deleteGrade} from "../../services/collectingService";
import {useAppContext} from "../../context/AppContext";
import {GRADE_RADIOS, GRADE_VARIANTS} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {IconButton} from "../minis/IconButton";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {getDataGradeValue, isSKGradeValue} from "../../helpers/functions";


export const EditGrade = ({grade, fetchGrades, issue, index, gradeValues}) => {

    const [radioValue, setRadioValue] = useState(null);
    const [issueValue, setIssueValue] = useState(0);
    const {user} = useAppContext();

    useEffect(() => {
        setRadioValue(grade.grade);
    }, [grade.grade]);

    useEffect(() => {
        if (radioValue) {
            setIssueValue(getDataGradeValue(gradeValues, radioValue));
        }
    }, [gradeValues, radioValue]);

    const handleEditGrade = (e) => {
        editGrade(grade.id, user.id, issue.id, e.target.value).then(() => fetchGrades());
    }

    const handleDeleteGrade = () => {
        deleteGrade(grade.id, user.id, issue.id).then(() => fetchGrades());
    }

    return radioValue && (
        <div className={"border rounded-3 p-3 bg-dog mb-4"}>
            <h3 className={"mb-4"}>
                <span className={"d-block mb-2 pb-2 border-bottom text-capitalize"}>{LABELS.COMMON.COPY} {index + 1}</span>
                {
                    issueValue >= 0 &&
                    <span className={"small"}>{LABELS.COMMON.COPY_VALUE} {issueValue} {LABELS.COMMON.COPY_VALUE_SEK} {issue.titles.is_valued === 0 && LABELS.COMMON.COPY_NOT_VALUED}</span>
                }
            </h3>
            <ButtonGroup className={"mb-2 d-flex flex-wrap "}>
                {GRADE_RADIOS.map((radio, index) => {
                    const checked = radioValue.toString() === radio.value.toString();
                    return (
                        <div key={grade.id + index}>
                            <input
                                tabIndex="0"
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
                            <label
                                htmlFor={`radio-${grade.id}-${index + 1}`}
                                className={`p-0 sms-grade-btn ${isSKGradeValue(radio.value) ? "sk-grade" : ""} ${checked ? "active bg-grade-" + GRADE_VARIANTS[radio.value].color : ""}`}
                            >
                                <div className={"fs-small py-2 px-3"}>
                                    <span className={"d-inline-block text-nowrap"}>{radio.name} {radio.value.toFixed(1)}</span>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </ButtonGroup>
            <IconButton variant={"danger"} icon={faTrashCan} onClick={handleDeleteGrade}
                        label={LABELS.COMMON.DELETE_GRADE + " " + LABELS.COMMON.COPY + " " + (index + 1)}/>
        </div>
    )
}
