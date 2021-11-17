import React from "react";
import {CLASSES} from "../helpers/constants";

const Spinner = ({small, color}) => {
    const spinnerClass = small ? CLASSES.SPINNER_SMALL : CLASSES.SPINNER;
    return (
        <div className={spinnerClass + ' ' + color} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

const SpinnerGrow = ({small, color}) => {
    const spinnerClass = small ? CLASSES.SPINNER_GROW_SMALL : CLASSES.SPINNER_GROW;
    return (
        <div className={spinnerClass + ' ' + color} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;
export {SpinnerGrow}
