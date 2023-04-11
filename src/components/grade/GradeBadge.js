import React from "react";


export const GradeBadge = ({grade}) => {

    const gradeVariants = {
        1: {
            variant: "0",
            text: "G",
            displayName: "Good",
            color: "200"
        },
        2: {
            variant: "1",
            text: "VG",
            displayName: "Very good",
            color: "400"
        },
        3: {
            variant: "2",
            text: "FN",
            displayName: "Fine",
            color: "600"
        },
        4: {
            variant: "3",
            text: "VF",
            displayName: "Very Fine",
            color: "800"
        },
        5: {
            variant: "4",
            text: "NM",
            displayName: "Near mint",
            color: "0"
        }
    }

    return !!grade && (
        <span className={`tag-badge text-black bg-grade-${gradeVariants[grade].color}`}>{gradeVariants[grade].displayName}</span>
    )
}
