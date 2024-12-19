import React from "react";
import {faFilter, faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FilterButtonGrade = ({grade, state, setState}) => {

    const handleChange = () => {
        setState(!state);
    }

    return (
        <div className={"form-check p-0 me-3"}>
            <input type={"checkbox"} className={"btn-check"} id={grade.id} autoComplete="off"
                   onChange={() => handleChange()} checked={state}/>
            <label className={`btn ${state ? "btn-secondary" : "btn-outline-light"} mb-2`}
                   htmlFor={grade.id}><FontAwesomeIcon icon={state ? faCircleXmark : faFilter}
                                                       className={"me-2"}/>{grade.text + " " + parseFloat(grade.id).toFixed(1)}</label>
        </div>
    )
};

export default FilterButtonGrade;
