import React, {useEffect, useState} from "react";
import {ButtonGroup, OverlayTrigger, Tooltip} from "react-bootstrap";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";
import {editGrade} from "../../services/collectService";
import {useAppContext} from "../../context/AppContext";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const EditGrade = ({grade, setGrade, issue}) => {

    const [radioValue, setRadioValue] = useState(null);
    const {user} = useAppContext();

    const radios = [
        {name: 'G', value: 1, displayName: "Good"},
        {name: 'VG', value: 2, displayName: "Very good"},
        {name: 'FN', value: 3, displayName: "Fine"},
        {name: 'VF', value: 4, displayName: "Very fine"},
        {name: 'NM', value: 5, displayName: "Near mint"},
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
                                    <OverlayTrigger
                                        key={radio.name}
                                        placement={"top"}
                                        overlay={
                                            <Tooltip id={radio.name}>
                                                {radio.displayName}
                                            </Tooltip>
                                        }
                                    >
                                        <div className={"fa-layers fa-fw"}>
                                            <Icon icon={faCertificate} className={checked ? "text-grade-0" : "text-grade-200"}/>
                                            <span aria-hidden={"true"} className={"fa-layers-text text-black fs-small"}>{radio.name}</span>
                                            <span className={"sr-only"}>{LABELS_AND_HEADINGS.GRADE}: {radio.displayName}</span>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </label>
                        </div>
                    )
                })}
            </ButtonGroup>
        </div>
    )
}
