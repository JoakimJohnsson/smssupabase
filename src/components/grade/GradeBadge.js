import React from "react";
import {GRADE_VARIANTS} from "../../helpers/constants";


export const GradeBadge = ({grade}) => {

    return !!grade && (
        <span className={`tag-badge text-black bg-grade-${GRADE_VARIANTS[grade].color}`}>{GRADE_VARIANTS[grade].displayName} {parseFloat(grade).toFixed(1)}</span>
    )
}
