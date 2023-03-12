import React, {useEffect, useState} from "react";
import {ButtonGroup, ToggleButton} from "react-bootstrap";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";

export const EditGrade = ({grade, setGrade, issue}) => {

    const [checked, setChecked] = useState(false);
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

    console.log("gra", grade);
    console.log("rval", radioValue);
    console.log("gra", grade);

    return (
        <div className={"w-100"}>
            <ButtonGroup className={"mb-2"}>
                {radios.map((radio, index) => (
                    <ToggleButton
                        key={index}
                        className={"p-0 border-0 rounded-0"}
                        variant={"outline-grade"}
                        id={`radio-${index}`}
                        type="radio"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        <div className={"fa-2x"}>
                            <div className={"fa-layers fa-fw"}>
                                <Icon icon={faCertificate} className={"text-grade-200"}/>
                                <span className={"fa-layers-text text-black fs-small"}>{radio.name}</span>
                            </div>
                        </div>
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    )
}
