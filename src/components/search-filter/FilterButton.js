import React from "react";
import {faFilter, faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const FilterButton = ({id, state, setState, name, setReadyForSearch}) => {

    const handleChange = () => {
        setReadyForSearch(true);
        setState(!state);
    }

    return (
        <div className={"form-check p-0 me-3"}>
            <input type={"checkbox"} className={"btn-check"} id={id} autoComplete="off" onChange={() => handleChange()}/>
            <label className={`btn ${state && "btn-secondary"} mb-2`} htmlFor={id}><FontAwesomeIcon icon={state ? faCircleXmark : faFilter} className={"me-2"}/>{name}</label>
        </div>
    )
};
export default FilterButton;
