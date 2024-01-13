import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";


export const GradeValuesListItem = ({title}) => {

    return (

        <li key={title.id} className={"title-card grade-values"}>
                <div className={"image-container mb-2 position-relative"}>
                    <img
                        src={title.image_url}
                        alt={LABELS_AND_HEADINGS.TITLE + " " + title.name}
                        className="w-100"
                        loading={"lazy"}
                    />
                </div>
        </li>

    )
}
