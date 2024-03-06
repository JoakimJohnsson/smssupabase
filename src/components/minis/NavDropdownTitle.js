import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Icon, dataIconDuoTone} from "../icons";


export const NavDropdownTitle = () => {
    return (
        <>
            <Icon icon={dataIconDuoTone} size={"2x"}/>
            {LABELS_AND_HEADINGS.CONTENT}
        </>
    )
}
