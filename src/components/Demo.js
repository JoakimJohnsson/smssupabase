import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants";
import {DemoIconDuoTone} from "./icons-duotone";
import {Icon} from "./icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import allIssues from "../assets/images/demoimages/allissues.gif";
import conan184 from "../assets/images/demoimages/conan184.gif";
import conan from "../assets/images/demoimages/conan.gif";
import conanColl from "../assets/images/demoimages/conancoll.gif";
import titles from "../assets/images/demoimages/titles.gif";
import myTitles from "../assets/images/demoimages/mytitles.gif";
import satellitforlaget from "../assets/images/demoimages/satellitforlaget.gif";


const Demo = () => {

    return (
        <div className={"sms-section--light"} id={"demo-section"}>
            <div className={"text-center"}>
                <DemoIconDuoTone size={"2x"} className={"fa-icon--cta"}/>

            </div>
            <div>
                <h2 className={"text-center"}>{LABELS_AND_HEADINGS.DEMO}</h2>
                <p className={"lead"}>{TEXTS.DEMO_TEXT_1}</p>
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v0.8.9 - 2023-07-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Visa format på titelkort.</li>
                    <li className={"list-group-item px-0"}>Visa senast inlagda information på startsidan.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v0.8.8 - 2023-06-15</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Länk till titel på comics.org.</li>
                    <li className={"list-group-item px-0"}>Lazy loading av bilder.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att välja list- eller grid-vy för publikationer på titel.</li>
                    <li className={"list-group-item px-0"}>Förbättrat utseende och funktion för att lägga till och ta bort publikationer och titlar från samlingen.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att börja samla på en titel från publikations sidan.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Visa mer statistik och information på startsida och kontrollpanel.</li>
                    <li className={"list-group-item px-0"}>Adminfunktioner på användares profilsida.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.CONTACT}</h3>
                <p>{TEXTS.ADMIN_INFO_2}</p>
                <p className={"mb-4"}>
                    <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                        <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                        admin@svenskamarvelsamlare.se
                    </a>
                </p>
                <h3>{LABELS_AND_HEADINGS.ALL_ISSUES}</h3>
                <p>{TEXTS.DEMO_TEXT_2}</p>
                <img className={"article-image mb-5"} src={allIssues} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                <h3>{LABELS_AND_HEADINGS.TITLES}</h3>
                <p>{TEXTS.DEMO_TEXT_3}</p>
                <img className={"article-image"} src={titles} alt={LABELS_AND_HEADINGS.TITLES}/>
                <p>{TEXTS.DEMO_TEXT_4}</p>
                <img className={"article-image"} src={conan} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                <img className={"article-image"} src={conanColl} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                <p>{TEXTS.DEMO_TEXT_6}</p>
                <img className={"article-image"} src={myTitles} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                <p>{TEXTS.DEMO_TEXT_7}</p>
                <img className={"article-image mb-5"} src={satellitforlaget} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                <h3>{LABELS_AND_HEADINGS.ISSUES}</h3>
                <p>{TEXTS.DEMO_TEXT_5}</p>
                <img className={"article-image mb-5"} src={conan184} alt={LABELS_AND_HEADINGS.ALL_ISSUES}/>
            </div>
        </div>
    )
}

export default Demo;
