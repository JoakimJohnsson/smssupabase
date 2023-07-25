import React from "react";
import {DataIconDuoTone} from "../icons-duotone";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";

export const NavDropdownTitle = () => {
    return (
        <>
            <DataIconDuoTone size={"2x"}/>
            {LABELS_AND_HEADINGS.CONTENT}
        </>
    )
}
