import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {editGrade} from "../../services/collectingService";
import {useAppContext} from "../../context/AppContext";
import {GRADE_RADIOS, LABELS_AND_HEADINGS} from "../../helpers/constants";


export const EditGrade = ({grade, setGrade, issue, index}) => {

    const [radioValue, setRadioValue] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        setRadioValue(grade);
    }, [grade])

    const handleEditGrade = (e) => {
        editGrade(user.id, issue.id, e.target.value).then(() => setGrade(e.target.value))
    }

    return radioValue && (
        <div className={"border rounded-3 p-3 bg-dog"}>
            <h3 className={"mb-4"}>{LABELS_AND_HEADINGS.COPY} {index}</h3>
            <ButtonGroup className={"mb-2 d-flex flex-wrap "}>
                {GRADE_RADIOS.map((radio, index) => {
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
                            <label tabIndex="0" htmlFor={`radio-${index + 1}`} className={`p-0 sms-grade-btn ${checked ? "active" : ""}`}>
                                    <div className={`${checked ? "bg-dog text-grade-0" : "bg-elephant text-grade-200"} fs-small py-2 px-3 rounded-pill`}>
                                        <span aria-hidden={"true"} className={"d-inline-block text-nowrap"}>{radio.name} {radio.value.toFixed(1)}</span>
                                    </div>
                            </label>
                        </div>
                    )
                })}
            </ButtonGroup>
            {/* TODO Knapp för att ta bort denna grade! */}
        </div>
    )
}
