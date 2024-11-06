import React from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import packageJson from '../../../../package.json';
import {useUtilsData} from "../../../helpers/customHooks/useUtilsData";


const Information = () => {

    const {utilsData} = useUtilsData();

    return (
        <div className={"sms-section--light"} id={"info-section"}>
            <div className={"mb-4 mb-sm-5"}>
                <div className={"text-center"}>
                    <Icon icon={infoIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                    <h2>{LABELS.COMMON.INFORMATION}</h2>
                </div>
                <p className={"lead"}>{TEXTS.INFO_TEXT_1}</p>
            </div>
            <div>
                <h3>{LABELS.COMMON.RELEASE_LATEST} v{packageJson.version} {utilsData && " | " + utilsData.release_date}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>...</li>
                </ul>
                <h3>{LABELS.COMMON.RELEASE_PREVIOUS}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Möjlighet att visa värde för en enskild titel.</li>
                    <li className={"list-group-item px-0"}>Tydligare information om varianter.</li>
                    <li className={"list-group-item px-0"}>Förbättrad filtrering och funktion på olika sökfilter.</li>
                    <li className={"list-group-item px-0"}>Små förbättringar på startsidan, lite bättre
                        användarupplevelse.
                    </li>
                    <li className={"list-group-item px-0"}>
                        Förbättrad visning av efterlysta publikationer och publikationer som behöver uppgradering. Både
                        i kontrollpanelen och på profilsida.
                    </li>
                    <li className={"list-group-item px-0"}>
                        Ny vy i kontrollpanelen - Mina publikationer. Likt Mina titlar kan du här titta igenom alla
                        publikationer i din samling.
                    </li>
                    <li className={"list-group-item px-0"}>Ytterligare förbättringar av publikationsväljaren.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att lägga till sina favorittitlar och
                        favoritpublikationer.
                    </li>
                    <li className={"list-group-item px-0"}>Förbättrad UX för funktionsknappar på titel och
                        publikation.
                    </li>
                    <li className={"list-group-item px-0"}>Prestandaförbättringar för databasen - minskat antal anrop
                        och kortare svarstider.
                    </li>
                </ul>
                <h3>{LABELS.COMMON.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                    <li className={"list-group-item px-0"}>Ytterligare förbättring av prestanda.</li>
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
