import React from "react";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const GradeBadge = ({grade}) => {

    const gradeVariants = {
        1: {
            variant: "0",
            text: "G",
            displayName: "Good",
            color: "text-grade-200"
        },
        2: {
            variant: "1",
            text: "VG",
            displayName: "Very good",
            color: "text-grade-400"
        },
        3: {
            variant: "2",
            text: "FN",
            displayName: "Fine",
            color: "text-grade-600"
        },
        4: {
            variant: "3",
            text: "VF",
            displayName: "Very Fine",
            color: "text-grade-800"
        },
        5: {
            variant: "4",
            text: "NM",
            displayName: "Near mint",
            color: "text-grade"
        }
    }

    return !!grade && (
        <div className={"mb-2 d-inline-block"}>
            <div className={"fa-layers fa-fw fa-3x"}>
                <Icon icon={faCertificate} className={gradeVariants[grade].color}/>
                <span aria-hidden={"true"} className={"fa-layers-text text-black fs-small"}>{gradeVariants[grade].text}</span>
                <span className={"sr-only"}>{LABELS_AND_HEADINGS.GRADE}: {gradeVariants[grade].displayName}</span>
            </div>
        </div>
    )
}
