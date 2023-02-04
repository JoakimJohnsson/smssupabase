import React from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";

export const Spinner = ({small, color, className}) => {
    let spinnerClass = small ? CLASSES.SPINNER_SMALL : CLASSES.SPINNER;
    if (className) {
        spinnerClass += " " + className;
    }
    if (color) {
        spinnerClass += " " + color;
    }

    return (
        <div className={spinnerClass} role="status">
            <span className="visually-hidden">{LABELS_AND_HEADINGS.LOADING}</span>
        </div>
    )
}
