import React from "react";
import {faFilter, faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const FilterButtonFormat = ({format, state, setState, setReadyForSearch}) => {

    const handleChange = () => {
        setReadyForSearch(true);
        setState(!state);
    }

    return (
        <div className={"form-check p-0 me-3"}>
            <input type={"checkbox"} className={"btn-check"} id={format.id} autoComplete="off" onChange={() => handleChange()} checked={state}/>
            <label className={`btn ${state ? "btn-secondary" : "btn-outline-light"} mb-2`} htmlFor={format.id}><FontAwesomeIcon icon={state ? faCircleXmark : faFilter} className={"me-2"}/>{format.name}</label>
        </div>
    )
};
export default FilterButtonFormat;
