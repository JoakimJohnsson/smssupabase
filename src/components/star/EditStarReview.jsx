import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {editGrade, deleteGrade} from "../../services/collectingService";
import {useAppContext} from "../../context/AppContext";
import {GRADE_RADIOS, GRADE_VARIANTS} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {IconButton} from "../minis/IconButton";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {getDataGradeValue, isSKGradeValue} from "../../helpers/functions";


export const EditStarReview = ({}) => {

    // TODO https://github.com/JoakimJohnsson/smssupabase/pull/90/files

    const [radioValue, setRadioValue] = useState(null);
    const {user} = useAppContext();

    const radios = [
        {name: 'F', value: 1},
        {name: 'D', value: 2},
        {name: 'C', value: 3},
        {name: 'B', value: 4},
        {name: 'A', value: 5},
    ];

    useEffect(() => {
        setRadioValue(grade);
    }, [grade])

    const handleStarReviewForIssue = (e) => {
        editStarReviewForIssue(user.id, issue.id, e.target.value).then(() => setStarReview(e.target.value))
    }
    const handleStarReviewForTitle = (e) => {
        editStarReviewForTitle(user.id, issue.id, e.target.value).then(() => setStarReview(e.target.value))
    }

    return radioValue && (
        <div className={"w-100"}>
            <ButtonGroup className={"mb-2"}>
                {radios.map((radio, index) => {
                    const checked = radioValue.toString() === radio.value.toString();
                    return (
                        <div key={index + radio.value}>
                            <input
                                className="btn-check"
                                name="radio"
                                type="radio"
                                autoComplete="off"
                                id={`radio-${index + 1}`}
                                value={radio.value}
                                checked={checked}
                                onChange={(e) => handleEditGrade(e)}
                            />
                            <label tabIndex="0" htmlFor={`radio-${index + 1}`} className={`p-0 rounded-0 sms-grade-btn ${checked ? "active" : ""}`}>
                                <div className={"fa-2x"}>
                                    <div className={"fa-layers fa-fw"}>
                                        <Icon icon={faCertificate} className={checked ? "text-grade-0" : "text-grade-200"}/>
                                        <span className={"fa-layers-text text-black fs-small"}>{radio.name}</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </ButtonGroup>
        </div>
    )
}
