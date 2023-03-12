import React from "react";
import {Icon} from "../icons";
import {faCertificate} from "@fortawesome/pro-solid-svg-icons";

export const GradeBadge = ({grade}) => {

    const gradeVariants = {
        0: {
            variant: "0",
            text: "G",
            color: "text-grade-200"
        },
        1: {
            variant: "1",
            text: "VG",
            color: "text-grade-400"
        },
        2: {
            variant: "2",
            text: "FN",
            color: "text-grade-600"
        },
        3: {
            variant: "3",
            text: "VF",
            color: "text-grade-800"
        },
        4: {
            variant: "4",
            text: "NM",
            color: "text-grade"
        }
    }

    return (
        <div className={"fa-2x mb-2 me-2"}>
            <div className={"fa-layers fa-fw"}>
                <Icon icon={faCertificate} className={gradeVariants[grade].color}/>
                <span className={"fa-layers-text text-black fs-small"}>{gradeVariants[grade].text}</span>
            </div>
        </div>
    )
}
