import React from "react";
import {Icon, dataIconDuoTone} from "../icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const NavDropdownTitle = () => {
    return (
        <>
            <Icon icon={dataIconDuoTone} size={"2x"}/>
            {LABELS.COMMON.CONTENT}
        </>
    )
}
