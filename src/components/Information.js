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
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.6.0 - 2024-xx-xx</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Förbättrad möjlighet för Admin att se, åtgärda och administrera meddelanden.</li>
                    <li className={"list-group-item px-0"}>Kontrollpanel - footer navigering istället för sidebar.</li>
                    <li className={"list-group-item px-0"}>Tydligare personlig information.</li>
                    <li className={"list-group-item px-0"}>Fixade bug som gjorde att Adminfunktion för att radera publikation inte fungerade.</li>
                    <li className={"list-group-item px-0"}>Uppgraderad till senaste version av Bootstrap.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.5.0 - 2024-01-14</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Bugfix - När man raderade ett meddelande försvann alla tillfälligt ur listan.</li>
                    <li className={"list-group-item px-0"}>Tydligare meddelande när användare väljer att sluta samla på en titel.</li>
                    <li className={"list-group-item px-0"}>Gridvy på titelsida visar nu antal exemplar och dess skick av en publikation.</li>
                    <li className={"list-group-item px-0"}>Visa skickvärdering även på sida för publikation.</li>
                    <li className={"list-group-item px-0"}>Egen sida med sök och filter för skickvärdering.</li>
                    <li className={"list-group-item px-0"}>Justering av färger för en bättre användarupplevelse.</li>
                    <li className={"list-group-item px-0"}>Värdering / gradering - Förbättrade adminfunktioner för input av värden.</li>
                    <li className={"list-group-item px-0"}>Förbättrad användarupplevelse vid skickgradering.</li>
                    <li className={"list-group-item px-0"}>Förbättrad sortering av publikationslistor som innehåller varianter.</li>
                    <li className={"list-group-item px-0"}>Möjlighet för användare att skicka meddelanden gällande värdering.</li>
                    <li className={"list-group-item px-0"}>Ny vy för att visa skickvärdering för en titel.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                    <li className={"list-group-item px-0"}>Utökad funktionalitet och förbättrade vyer i kontrollpanelen.</li>
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
