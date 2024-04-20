import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants/configConstants";
import {Icon, infoIconDuoTone} from "./icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../helpers/constants/textConstants/labelsAndHeadings";


const Information = () => {

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"text-center"}>
                <Icon icon={infoIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
            </div>
            <div>
                <div className={"text-center mb-4 mb-sm-5"}>
                    <h2 className={"text-center"}>{LABELS.COMMON.INFORMATION}</h2>
                    <p className={"lead"}>{TEXTS.INFO_TEXT_1}</p>
                </div>
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.6.5 - 2024-04-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Förbättrad länk till Seriekatalogen för titel.</li>
                    <li className={"list-group-item px-0"}>Visa status för marvelklubben-samlingen på Kontrollpanelens översikt.</li>
                    <li className={"list-group-item px-0"}>Visa mer / mindre funktion för stora filtersökningar där det behövdes. T.ex. Marvelklubben
                        och Alla publikationer.
                    </li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.6.4 - 2024-04-02</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Nu visas senast inlagda titlar och publikationer korrekt på startsidan.</li>
                    <li className={"list-group-item px-0"}>Det är nu möjligt att skicka meddelanden till admin med ämnet "Kompletteringar".</li>
                    <li className={"list-group-item px-0"}>Tydligare information om varianter i lista med skickvärderingar.</li>
                    <li className={"list-group-item px-0"}>Länk till seriekatalogen försöker nu hänvisa till rätt titel.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att lägga till beskrivning på publikationer.</li>
                    <li className={"list-group-item px-0"}>Omdirigera till startsida med login om man försöker nå sida utan att vara inloggad.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                    <li className={"list-group-item px-0"}>Utökad funktionalitet och förbättrade vyer i kontrollpanelen.</li>
                </ul>
                <h3>{LABELS.COMMON.CONTACT}</h3>
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
