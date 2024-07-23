import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants/configConstants";
import {Icon, infoIconDuoTone} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";


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
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.7.1 - 2024-07-23</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Karta - möjlighet att ange egen plats för sökningar.</li>
                    <li className={"list-group-item px-0"}>Karta - Knapp för att rensa vald sökning.</li>
                    <li className={"list-group-item px-0"}>Har lagt till en sektion med nyttiga länkar i kontrollpanelen.</li>
                    <li className={"list-group-item px-0"}>Möjlighet för Admin att skicka meddelanden till användare.</li>
                    <li className={"list-group-item px-0"}>Förbättrade sökresultat för loppisar o.s.v. när man är utomlands.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.7.0 - 2024-06-10</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Förbättrade menyer, lättare att hitta kontrollpaneler.</li>
                    <li className={"list-group-item px-0"}>Möjlighet för användare att godkänna användning av platsåtkomst.</li>
                    <li className={"list-group-item px-0"}>Kartfunktion för att enkelt hitta närmaste loppis, second hand eller serietidningsaffär, om
                        användaren tillåtit platsåtkomst.
                    </li>
                    <li className={"list-group-item px-0"}>Bättre sortering på sidan Alla publikationer.</li>
                    <li className={"list-group-item px-0"}>Förbättrad länk till Seriekatalogen för titel.</li>
                    <li className={"list-group-item px-0"}>Visa status för marvelklubben-samlingen på Kontrollpanelens översikt.</li>
                    <li className={"list-group-item px-0"}>Förbättrad visning av Skickvärderingar.</li>
                    <li className={"list-group-item px-0"}>Visa mer / mindre funktion för stora filtersökningar där det behövdes. T.ex. Marvelklubben
                        och Alla publikationer.
                    </li>
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
