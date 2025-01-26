import React from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Icon, mailIcon, mailIconDuoTone} from "../../icons";
import {faBinaryCircleCheck, faBinaryLock, faCrystalBall} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import packageJson from '../../../../package.json';
import {useUtilsData} from "../../../helpers/customHooks/useUtilsData";


const ReleaseNotes = () => {

    const {utilsData} = useUtilsData();

    return (
        <div>
            <Icon icon={faBinaryCircleCheck} size={"2x"} className={"fa-icon--cta"}/>
            <h3>{LABELS.COMMON.RELEASE_LATEST} v{packageJson.version} {utilsData && " | " + utilsData.release_date}</h3>
            <ul className={"list-group list-group-flush mb-4"}>
                <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                <li className={"list-group-item px-0"}>Recension heter numera Betyg överallt.</li>
                <li className={"list-group-item px-0"}>Möjlighet att söka alla titlar och publikationer från startsidan.</li>
                <li className={"list-group-item px-0"}>Sök och filter tar nu hänsyn till hela sökfrågan, vilket ger mer exakta resultat.</li>
                <li className={"list-group-item px-0"}>Förbättrad komponent för att lägga till betyg eller skicka meddelande på titel och publikation.</li>
            </ul>
            <Icon icon={faBinaryLock} size={"2x"} className={"fa-icon--cta"}/>
            <h3>{LABELS.COMMON.RELEASE_PREVIOUS}</h3>
            <ul className={"list-group list-group-flush mb-4"}>
                <li className={"list-group-item px-0"}>Möjlighet att filtrera lista med Mina publikationer på
                    skickgradering.
                </li>
                <li className={"list-group-item px-0"}>Uppdaterad och förbättrad layout på knappar.</li>
                <li className={"list-group-item px-0"}>Möjlighet att exportera sina saknade publikationer som CSV och
                    PDF.
                </li>
                <li className={"list-group-item px-0"}>Möjlighet att exportera lite annan data som CSV och PDF.</li>
                <li className={"list-group-item px-0"}>Vid felrapport skapas nu automatiskt en issue på GitHub.</li>
                <li className={"list-group-item px-0"}>Kartan har blivit större och fått nya ikoner.</li>
                <li className={"list-group-item px-0"}>Nu kan man lägga till stjärnbetyg på alla titlar och
                    publikationer.
                </li>
                <li className={"list-group-item px-0"}>På prov - Slumpmässigt utvalda AI-genererade profilbilder för de
                    användare som ej lagt in en egen.
                </li>
            </ul>
            <Icon icon={faCrystalBall} size={"2x"} className={"fa-icon--cta"}/>
            <h3>{LABELS.COMMON.RELEASE_FUTURE}</h3>
            <ul className={"list-group list-group-flush mb-4"}>
                <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                <li className={"list-group-item px-0"}>Ytterligare förbättring av prestanda.</li>
            </ul>
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

export default ReleaseNotes;
