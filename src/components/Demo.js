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
                <h3>{LABELS_AND_HEADINGS.RELEASE_LATEST} v0.9.4 - 2023-10-XX</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Öppna upp registrering för 3 st beta test användare.</li>
                    <li className={"list-group-item px-0"}>Översikt - Visa lite statistik.</li>
                    <li className={"list-group-item px-0"}>Andra Samlingar - Visa lite statistik för andra användares samlingar.</li>
                    <li className={"list-group-item px-0"}>Knappar för att lägga till eller ta bort alla publikationer från en titel man samlar på.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS} v0.9.3 - 2023-10-07</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Lägga in och visa information om källmaterial.</li>
                    <li className={"list-group-item px-0"}>Förbättra visning av sökresultat i publikationssök.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att filtrera på hela publikationens namn i publikationssök.</li>
                    <li className={"list-group-item px-0"}>Visa källinformation på publikationssida.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att bara visa saknade publikationer på en titelsida.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att visualisera statistik med hjälp av Recharts.</li>
                    <li className={"list-group-item px-0"}>Kunna visa original omslagsbild på publikationssida.</li>
                    <li className={"list-group-item px-0"}>Kontrollpanel - Mina titlar - Möjlighet att kunna söka och filtrera titlar.</li>
                    <li className={"list-group-item px-0"}>Kontrollpanel - Mina titlar - Förbättrad visning av titlar - Status o.s.v.</li>
                    <li className={"list-group-item px-0"}>Titelsida - Länk till Kontrollpanel - Mina titlar.</li>
                    <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                    <li className={"list-group-item px-0"}>Bugfix - Dölj tooltips i mobil/tablet läge.</li>
                    <li className={"list-group-item px-0"}>Bugfix titelsida - Man ska inte ha möjlighet att sluta samla på en titel samtidigt som man har publikationer av den i samlingen.</li>
                    <li className={"list-group-item px-0"}>Förbättrad funktion för att hantera användares roller.</li>
                    <li className={"list-group-item px-0"}>Lägg till grundläggande information på profilsida.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att lägga till information om källmaterial på publikation.</li>
                    <li className={"list-group-item px-0"}>Möjlighet att filtrera på information om källmaterial i publikationssöket.</li>
                </ul>
                <h3>{LABELS_AND_HEADINGS.RELEASE_FUTURE}</h3>
                <ul className={"list-group list-group-flush mb-4"}>
                    <li className={"list-group-item px-0"}>Förbättringar efter beta test.</li>
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
