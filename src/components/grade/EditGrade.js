import React, {useEffect, useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";

export const EditGrade = ({grade, setGrade, issue}) => {

    // const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(null);

    // TODO - function to change grade

    const radios = [
        {name: 'G', value: 0},
        {name: 'VG', value: 1},
        {name: 'FN', value: 2},
        {name: 'VF', value: 3},
        {name: 'NM', value: 4},
    ];

    useEffect(() => {
        setRadioValue(grade);
    }, [grade])

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
                                id={`radio-${index}`}
                                value={radio.value}
                                checked={checked}
                                onChange={(e) => setGrade(e.currentTarget.value)}
                            />
                            <label tabIndex="0" htmlFor={`radio-${index}`} className={`p-0 rounded-0 sms-grade-btn ${checked ? "active" : ""}`}>
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
