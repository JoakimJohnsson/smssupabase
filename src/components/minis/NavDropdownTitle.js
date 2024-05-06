import React from "react";
import {Icon, moreIconDuoTone} from "../icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const NavDropdownTitle = () => {
    return (
        <>
            <Icon icon={moreIconDuoTone} size={"2x"}/>
            <span>{LABELS.COMMON.MORE_CONTENT}</span>
        </>
    )
}
