import React from "react";
import {GRADE_VARIANTS} from "../../helpers/constants/configConstants";


export const GradeBadge = ({grade, index, small = false}) => {

    return !!grade && (
        small ?
            <span className={`tag-badge small text-black bg-grade-${GRADE_VARIANTS[grade].color}`}>{GRADE_VARIANTS[grade].text} {parseFloat(grade).toFixed(1)}</span>
            :
            <span className={`tag-badge text-black bg-grade-${GRADE_VARIANTS[grade].color}`}>{index + 1}. {GRADE_VARIANTS[grade].displayName} {parseFloat(grade).toFixed(1)}</span>
    )
}
