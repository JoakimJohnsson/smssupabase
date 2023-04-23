import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants";
import {DemoIconDuoTone} from "./icons-duotone";
import {Icon} from "./icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


const Demo = () => {

    return (
        <div className={"sms-section--light"} id={"demo-section"}>
            <div className={"text-center"}>
                <DemoIconDuoTone size={"2x"} className={"fa-icon--cta"}/>

            </div>
            <div>
                <h2 className={"text-center"}>{LABELS_AND_HEADINGS.DEMO}</h2>
                <p className={"lead"}>{TEXTS.DEMO_TEXT_1}</p>
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST}</h3>
                <ul className={"list-group list-group-flush mb-3"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Uppdaterade paket.</li>
                    <li className={"list-group-item px-0"}>Funktionalitet för sök / filtrering.</li>
                    <li className={"list-group-item px-0"}>Förbättrad layout för förlagssida.</li>
                    <li className={"list-group-item px-0"}>En Demo sektion på landningssidan.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.CONTACT}</h3>
                <p>{TEXTS.ADMIN_INFO_2}</p>
                <p>
                    <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                        <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                        admin@svenskamarvelsamlare.se
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Demo;
