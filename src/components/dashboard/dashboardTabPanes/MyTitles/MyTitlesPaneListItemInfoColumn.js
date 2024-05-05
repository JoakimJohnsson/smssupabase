import React from "react";
import {FormatBadge} from "../../../minis/FormatBadge";


export const MyTitlesPaneListItemInfoColumn = ({title, completed, titleProgress}) => {
    return (
        <div className={"col-12"}>
                <div className={"p-3"}>
                    <span
                        className={`tag-badge text-black mb-3 ${completed ? "bg-success" : "bg-grade"}`}>{titleProgress.progress + "%"}</span>
                    <FormatBadge formatId={title.format_id} customClass={"mb-3"} year={title.start_year}/>
                </div>
        </div>
    )
}
