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
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v1.3.0 - 2024-XX-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att ange skickgradering via tangentbordsnavigering.</li>
                    <li className={"list-group-item px-0"}>(BETA) Värdering baserat på skick - Funktionalitet för Admin att redigera värden.</li>
                    <li className={"list-group-item px-0"}>(BETA) Värdering - grundläggande värden inlagt på vissa publikationer. Delvis baserat på Seriekatalogens värdering.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.2.0 - 2023-12-10</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Utökat och förbättrat graderingssystem - fler värden kan nu anges.</li>
                    <li className={"list-group-item px-0"}>Användare kan lägga till skickgraderingar för fler än ett exemplar av en publikation.</li>
                    <li className={"list-group-item px-0"}>Snittvärde för gradering visas i kontrollpanelen.</li>
                    <li className={"list-group-item px-0"}>Förbättrad komponent för felaktig routing.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
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
