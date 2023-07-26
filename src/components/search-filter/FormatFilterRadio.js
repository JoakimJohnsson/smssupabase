import React from "react";


const FormatFilterRadio = ({format}) => {

    return (
            <div className={"form-check me-3"}>
                <input className="form-check-input" type="radio" name="formatFilterRadio" id={format.id} value={format.id}/>
                <label className="form-check-label" htmlFor={format.id}>
                    {format.name}
                </label>
            </div>
    )
};

export default FormatFilterRadio;
