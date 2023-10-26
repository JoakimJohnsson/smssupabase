import React from "react";


const CustomProgressBar = ({label, variant, valueNow}) => {

    return (
        <div className="progress">
            <div
                className={`progress-bar progress-bar-striped bg-${variant}`}
                role="progressbar"
                style={{width: valueNow + "%"}}
                aria-label={label}
                aria-valuenow={valueNow}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    )
}

export default CustomProgressBar;
