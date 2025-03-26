import React from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone, mailIcon, mailIconDuoTone} from "../../icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";


const Information = () => {

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"mb-4 mb-sm-5"}>
                <div className={"text-center"}>
                    <Icon icon={infoIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                    <h2>{LABELS.COMMON.INFORMATION}</h2>
                </div>
            </div>
            <Icon icon={mailIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
            <h3>{LABELS.COMMON.CONTACT}</h3>
            <p>{TEXTS.ADMIN_INFO_2}</p>
            <p className={"mb-4"}>
                <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                    <Icon icon={mailIcon} className={"me-2"}/>
                    admin@svenskamarvelsamlare.se
                </a>
            </p>
        </div>
    )
}

export default Information;
