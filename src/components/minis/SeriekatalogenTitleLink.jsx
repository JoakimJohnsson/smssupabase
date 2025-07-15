import React from "react";
import {trimAndReplaceSwedishCharacters} from "../../helpers/functions";
import {Icon} from "../icons/Icons.jsx";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";


export const SeriekatalogenTitleLink = ({titleName}) => {

    return (
        <a className={"d-block"} href={"https://seriekatalogen.se/title/#" + trimAndReplaceSwedishCharacters(titleName, "_")}
           target={"_blank"} rel={"noreferrer"}>
            {titleName} hos Seriekatalogen
            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
        </a>
    )
}
