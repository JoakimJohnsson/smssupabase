import React from "react";


const CustomProgressBar = ({rounded = true, label, variant, valueNow}) => {
    return (
        <div className={`progress ${!rounded && "rounded-0"}`}>
            <div
                className={`progress-bar progress-bar-striped bg-${variant}`}
                role="progressbar"
                style={{width: valueNow + "%"}}
                aria-label={label}
                aria-valuenow={valueNow}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {
                    valueNow > 33 &&
                    label
                }
            </div>
        </div>
    )
}

export default CustomProgressBar;
