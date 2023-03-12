import React from "react";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";

export const GradeBadge = ({grade}) => {

    const gradeVariants = {
        1: {
            variant: "1",
            text: "G",
            color: "text-grade-200"
        },
        2: {
            variant: "2",
            text: "VG",
            color: "text-grade-400"
        },
        3: {
            variant: "3",
            text: "FN",
            color: "text-grade-600"
        },
        4: {
            variant: "4",
            text: "VF",
            color: "text-grade-800"
        },
        5: {
            variant: "5",
            text: "NM",
            color: "text-grade"
        }
    }

    return (
        <div className={"fa-2x"}>
            <span className={"fa-layers fa-fw"}>
                <Icon icon={faCertificate} className={gradeVariants[grade].color}/>
                <span className={"fa-layers-text text-black fs-small"}>{gradeVariants[grade].text}</span>
            </span>
        </div>
    )
}
