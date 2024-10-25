import React from "react";
import {faArrowLeftLong} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {useNavigate} from "react-router-dom";
import {handleBacking} from "../../helpers/functions.jsx";
import {Icon} from "../icons/index.jsx";


export const BackButton = () => {

    const navigate = useNavigate();

    return (
        <button onClick={() => handleBacking(navigate)} className={"btn btn-primary"} aria-label={LABELS.COMMON.BACK}>
            <Icon icon={faArrowLeftLong} className={"fa-xl fa-fw"}/>
        </button>
    )
}
