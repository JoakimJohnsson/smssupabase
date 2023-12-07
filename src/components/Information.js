import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants";
import {InfoIconDuoTone} from "./icons-duotone";
import {Icon} from "./icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


const Information = () => {

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"text-center"}>
                <InfoIconDuoTone size={"2x"} className={"fa-icon--cta"}/>
            </div>
            <div>
                <div className={"text-center mb-4 mb-sm-5"}>
                    <h2 className={"text-center"}>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                    <p className={"lead"}>{TEXTS.INFO_TEXT_1}</p>
                </div>
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.2.0 - 2023-01-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Utökat och förbättrat graderingssystem.</li>
                    <li className={"list-group-item px-0"}>Medelvärde för gradering visas i kontrollpanelen.</li>
                    <li className={"list-group-item px-0"}>Förbättrad komponent för statussidor (404) och felaktig routing.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.1.0 - 2023-12-05</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Förbättrade adminfunktioner.</li>
                    <li className={"list-group-item px-0"}>Det ska vara enkelt att rapportera felaktigheter, buggar och förbättringsförslag till
                        admin.
                    </li>
                    <li className={"list-group-item px-0"}>Admin ska kunna skicka ut globala meddelanden om t.ex. releaser, nyheter och information.</li>
                    <li className={"list-group-item px-0"}>Funktion för att kunna markera publikationer som efterlysta.</li>
                    <li className={"list-group-item px-0"}>Funktion för att kunna markera publikationer som behöver uppgraderas.</li>
                    <li className={"list-group-item px-0"}>Visa information om efterlysning och uppgradering på profilsida och översikt.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>
                        Under utredning - möjlighet att ha flera exemplar av samma publikation.
                    </li>
                    <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.CONTACT}</h3>
                <p>{TEXTS.ADMIN_INFO_2}</p>
                <p className={"mb-4"}>
                    <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                        <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                        admin@svenskamarvelsamlare.se
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Information;
