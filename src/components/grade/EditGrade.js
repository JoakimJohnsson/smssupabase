import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";
import {editGrade} from "../../helpers/functions/serviceFunctions/collectFunctions";
import {useAppContext} from "../../context/AppContext";

export const EditGrade = ({grade, setGrade, issue}) => {

    const [radioValue, setRadioValue] = useState(null);
    const {user} = useAppContext();

    const radios = [
        {name: 'G', value: 1},
        {name: 'VG', value: 2},
        {name: 'FN', value: 3},
        {name: 'VF', value: 4},
        {name: 'NM', value: 5},
    ];

    useEffect(() => {
        setRadioValue(grade);
    }, [grade])

    const handleEditGrade = (e) => {
        editGrade(user.id, issue.id, e.target.value).then(() => setGrade(e.target.value))
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
