import React from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone} from "../../icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import ReleaseNotes from "./ReleaseNotes.jsx";


const Information = () => {

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"mb-4 mb-sm-5"}>
                <div className={"text-center"}>
                    <Icon icon={infoIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                    <h2>{LABELS.COMMON.INFORMATION}</h2>
                </div>
                <p className={"lead"}>{TEXTS.INFO_TEXT_1}</p>
            </div>
            <ReleaseNotes/>
        </div>
    )
}

export default Information;
