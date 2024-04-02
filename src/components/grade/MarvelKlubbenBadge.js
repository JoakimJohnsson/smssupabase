import React from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const MarvelKlubbenBadge = ({number}) => {

    return (
        <span className={`tag-badge text-black bg-marvelklubben-0`}>{LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN + " " + number}</span>
    )
}
