import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants";
import {Icon, infoIconDuoTone} from "./icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


const Information = () => {

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"text-center"}>
                <Icon icon={infoIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
            </div>
            <div>
                <div className={"text-center mb-4 mb-sm-5"}>
                    <h2 className={"text-center"}>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                    <p className={"lead"}>{TEXTS.INFO_TEXT_1}</p>
                </div>
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.6.3 - 2024-03-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Nu visas senast inlagda titlar och publikationer korrekt på startsidan.</li>
                    <li className={"list-group-item px-0"}>Det är nu möjligt att skicka meddelanden till admin med ämnet "Kompletteringar".</li>

                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.6.0 - 2024-03-06</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Förbättrad möjlighet för Admin att se, åtgärda och administrera meddelanden.</li>
                    <li className={"list-group-item px-0"}>Kontrollpanel - footer navigering istället för sidebar.</li>
                    <li className={"list-group-item px-0"}>Tydligare personlig information.</li>
                    <li className={"list-group-item px-0"}>Fixade bug som gjorde att Adminfunktion för att radera publikation inte fungerade.</li>
                    <li className={"list-group-item px-0"}>Uppgraderad till senaste version av Bootstrap.</li>
                    <li className={"list-group-item px-0"}>Uppdatera övriga paket.</li>
                    <li className={"list-group-item px-0"}>Visa information om skickgradering för publikationer i samlingen på titelsidan.</li>
                    <li className={"list-group-item px-0"}>Blandade kodförbättringar.</li>
                    <li className={"list-group-item px-0"}>Räkna ut och visa upp det sammanlagda värdet på samlingen.</li>
                    <li className={"list-group-item px-0"}>Spara och visa viss historik över värderingens förändring över tid.</li>
                    <li className={"list-group-item px-0"}>Skickgraderingar för publikation tas nu bort när användaren slutar samla på den.</li>
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
