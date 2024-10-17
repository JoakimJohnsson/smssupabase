import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants/configConstants";
import {Icon, infoIconDuoTone} from "../../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import packageJson from '../../../../package.json';
import {useUtilsData} from "../../../helpers/customHooks/useUtilsData";


const Information = () => {

    const {utilsData} = useUtilsData();

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
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v{packageJson.version} {utilsData && " | " + utilsData.release_date}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Bugfixar.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v1.9.1 | 2024-10-16</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Förbättrad information om användare i Admin gränssnitt.</li>
                    <li className={"list-group-item px-0"}>Lagt till sökformulär och paginering på Adminsida för alla publikationer.</li>
                    <li className={"list-group-item px-0"}>Publikationsväljaren på publikationssida kan nu hoppa mellan årtal.</li>
                    <li className={"list-group-item px-0"}>Applikationen använder nu Vite som byggverktyg.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Optimering av bilder.</li>
                    <li className={"list-group-item px-0"}>Utökad funktionalitet och förbättrade vyer i
                        kontrollpanelen.
                    </li>
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
