import React from "react";
import {CLASSES, LABELS_AND_HEADINGS, MESSAGES, TEXTS} from "../../../../helpers/constants";
import {isTrue} from "../../../../helpers/functions";
import {useNavigate, useSearchParams} from "react-router-dom";
import {faArrowLeft, faPlus, faTimes} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {supabase} from "../../../../supabase/supabaseClient";
import {useAppContext} from "../../../../context/AppContext";
import {updateGradeValuesValues} from "../../../../services/collectingService";
import {editIcon, saveIcon} from "../../../icons";


export const AdminIssueGradeValueEdit = ({issue, title, gradeValues, setGradeValues, fetchGradeValues}) => {

    const [searchParams, setSearchParams] = useSearchParams({editgradevalue: false})
    const {setInformationMessage} = useAppContext();
    const navigate = useNavigate();
    const editGradeValue = isTrue(searchParams.get("editgradevalue"));

    const handleSubmit = () => {
        updateGradeValuesValues(gradeValues).then(() => setSearchParams({editgradevalue: false}));
    }

    const handleAddGradeValues = async () => {
        try {
            // Performing a supabase sql function - insert_all_grade_values_for_issue
            await supabase.rpc('insert_all_grade_values_for_issue', {input_issue_id: issue.id, input_value: 0}).then(() => fetchGradeValues());
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteGradeValues = async () => {
        if (!window.confirm(MESSAGES.CONFIRM.DELETE_GRADE_VALUES)) {
            setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
            return false;
        }
        try {
            // Performing a supabase sql function - delete_all_grade_values_for_issue
            await supabase.rpc('delete_all_grade_values_for_issue', {input_issue_id: issue.id}).then(() => fetchGradeValues());
        } catch (error) {
            console.error(error);
        }
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
                                    <IconButton variant={"primary"} onClick={handleAddGradeValues} label={LABELS_AND_HEADINGS.ADD} icon={faPlus}/>
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
                        {gradeValues.map((gradeValue) => {
                            return (
                                <div key={gradeValue.id}>
                                    <label className={"form-label"} htmlFor={gradeValue.id}>{gradeValue.grade_name} {gradeValue.grade}</label>
                                    <input
                                        id={gradeValue.id}
                                        name={gradeValue.id}
                                        className={CLASSES.FORM_INPUT_DEFAULT}
                                        type="number"
                                        step={"10"}
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
                                        disabled={!editGradeValue}
                                    />
                                </div>
                            )
                        })}
                        {
                            editGradeValue ?
                                <>
                                    <IconButton variant={"primary"} onClick={handleSubmit} label={LABELS_AND_HEADINGS.SAVE} icon={saveIcon}/>
                                    <button className={"btn btn-secondary sms-btn"} onClick={handleAbort}>
                                        {LABELS_AND_HEADINGS.ABORT}
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
