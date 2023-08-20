import React from "react";


const FilterButton = ({id, state, setState, name}) => {
    return (
        <div className={"form-check p-0 me-3"}>
            <input type={"checkbox"} className={"btn-check"} id={id} autoComplete="off" onChange={() => setState(!state)}/>
            <label className={`btn btn-sm ${state ? "btn-secondary" : "btn-primary"} mb-2`} htmlFor={id}>{name}</label>
        </div>
    )
};
export default FilterButton;
