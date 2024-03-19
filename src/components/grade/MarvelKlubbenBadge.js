import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";


export const MarvelKlubbenBadge = ({number}) => {

    return (
        <span className={`tag-badge text-black bg-marvelklubben-0`}>{LABELS_AND_HEADINGS.MARVELKLUBBEN + " " + number}</span>
    )
}
