import React from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../helpers/constants";

const Spinner = ({small, color}) => {
    const spinnerClass = small ? CLASSES.SPINNER_SMALL : CLASSES.SPINNER;
    return (
        <div className={spinnerClass + ' ' + color} role="status">
            <span className="visually-hidden">{LABELS_AND_HEADINGS.LOADING}</span>
        </div>
    )
}

const SpinnerGrow = ({small, color}) => {
    const spinnerClass = small ? CLASSES.SPINNER_GROW_SMALL : CLASSES.SPINNER_GROW;
    return (
        <div className={spinnerClass + ' ' + color} role="status">
            <span className="visually-hidden">{LABELS_AND_HEADINGS.LOADING}</span>
        </div>
    )
}

export default Spinner;
export {SpinnerGrow}
