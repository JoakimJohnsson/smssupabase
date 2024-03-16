import React, {useState} from "react";
import {CLASSES, LABELS_AND_HEADINGS, MESSAGES, TEXTS} from "../../../../helpers/constants";
import {isSKGradeName, isTrue} from "../../../../helpers/functions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft, faPlus, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {useAppContext} from "../../../../context/AppContext";
import {updateGradeValuesValues} from "../../../../services/collectingService";
import {editIcon, saveIcon} from "../../../icons";
import {deleteAllGradeValuesForIssue, insertAllGradeValuesForIssue} from "../../../../helpers/databaseFunctions";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const AdminIssueGradeValueEdit = ({issue, title, gradeValues, setGradeValues, fetchGradeValues}) => {

    const [searchParams, setSearchParams] = useSearchParams({editgradevalue: false})
    const {setInformationMessage} = useAppContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const editGradeValue = isTrue(searchParams.get("editgradevalue"));

    const handleSubmit = () => {
        setLoading(true);
        updateGradeValuesValues(gradeValues, setInformationMessage).then(() => {
            setSearchParams({editgradevalue: false});
            setLoading(false);
        });
    }

    const handleDeleteGradeValues = async () => {
        if (!window.confirm(MESSAGES.CONFIRM.DELETE_GRADES)) {
            setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
            return false;
        }
        await deleteAllGradeValuesForIssue(issue.id, fetchGradeValues);
    }
    const handleAbort = () => {
        setSearchParams({editgradevalue: false});
    }

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.GRADE}</h2>
                {
                    <div className={"mb-4"}>
                        <h3>{LABELS_AND_HEADINGS.ADD_GRADE_VALUE}</h3>
                        {
                            gradeValues && gradeValues.length === 0 ?
                                <>
                                    <p>{TEXTS.GRADE_ADD_VALUE_TEXT}</p>
                                    <IconButton variant={"primary"} onClick={() => insertAllGradeValuesForIssue(issue.id, fetchGradeValues)} label={LABELS.COMMON.ADD} icon={faPlus}/>
                                </>
                                :
                                <>
                                    <p>{TEXTS.GRADE_ISSUE_IS_VALUED_TEXT}</p>
                                    <IconButton variant={"danger"} onClick={handleDeleteGradeValues} label={LABELS_AND_HEADINGS.REMOVE}
                                                icon={faTimes}/>
                                </>
                        }
                    </div>
                }
                {
                    gradeValues && !!gradeValues.length &&
                    <>
                        <h3>{LABELS_AND_HEADINGS.EDIT_GRADE_VALUE}</h3>
                        {gradeValues.sort((a, b) => {
                           return (a.grade - b.grade);
                        }).map((gradeValue) => {
                            return (
                                <div key={gradeValue.id}>
                                    <label className={`form-label ${isSKGradeName(gradeValue.grade_name) && "text-grade"}`} htmlFor={gradeValue.id}>{gradeValue.grade_name} {gradeValue.grade}</label>
                                    <input
                                        id={gradeValue.id}
                                        name={gradeValue.id}
                                        className={CLASSES.FORM_INPUT_DEFAULT}
                                        type="number"
                                        step={"10"}
                                        min={0}
                                        value={gradeValue.value || 0}
                                        // Using functional version of setGradeValues()
                                        onChange={(e) => {
                                            const updatedValue = e.target.value;
                                            setGradeValues(currentValues =>
                                                currentValues.map(item =>
                                                    item.id === gradeValue.id ? {...item, value: updatedValue} : item
                                                )
                                            );
                                        }}
                                        disabled={!editGradeValue || loading}
                                    />
                                </div>
                            )
                        })}
                        {
                            editGradeValue ?
                                <>
                                    <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS_AND_HEADINGS.SAVE} icon={saveIcon} loading={loading}/>
                                    <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                        {LABELS.COMMON.ABORT}
                                    </button>
                                </>
                                :
                                <>
                                    <IconButton variant={"primary"} onClick={() => setSearchParams({editgradevalue: true})} label={LABELS_AND_HEADINGS.EDIT} icon={editIcon}/>
                                    <IconButton variant={"outline-primary"} icon={faArrowLeft}
                                                onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                                label={LABELS_AND_HEADINGS.BACK_TO + " " + title.name}/>
                                </>
                        }
                    </>
                }
            </div>
        </div>
    )
}
