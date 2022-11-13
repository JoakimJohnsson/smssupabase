import React from "react";
import {CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";

export const Spinner = ({small, color}) => {
    const spinnerClass = small ? CLASSES.SPINNER_SMALL : CLASSES.SPINNER;
    return (
        <div className={spinnerClass + " " + color} role="status">
            <span className="visually-hidden">{LABELS_AND_HEADINGS.LOADING}</span>
        </div>
    )
}
