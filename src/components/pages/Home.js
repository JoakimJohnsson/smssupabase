import React, {useEffect, useCallback, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {getRowByTableAndId} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {Icon} from "../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


export const Home = () => {

    const {user} = useAppContext();
    const package_json = require('../../../package.json');
    const [utilsData, setUtilsData] = useState({})

    const fetchUtilsData = useCallback(() => {
        getRowByTableAndId(TABLES.UTILS, setUtilsData, 1).then();
    }, [])

    useEffect(() => {
        fetchUtilsData();
    }, [fetchUtilsData])

    return user && user.id ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.WELCOME}/>
                        <p className={"lead"}>Sidan är för tillfället under utveckling och genomgår nu olika stadier av utveckling, test och
                            kravställning.</p>
                        <p>För frågor och förbättringsförslag:</p>
                        <p>
                            <a href={"mailto: admin@svenskamarvelsamlare.se"}>
                                <Icon icon={faMailboxFlagUp} className={"me-2"}/>
                                admin@svenskamarvelsamlare.se
                            </a>
                        </p>
                    </div>
                </div>
                <div className={"row row-padding--secondary"}>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-section--light"}>
                            <h2>{LABELS_AND_HEADINGS.RELEASE_LATEST}</h2>
                            {utilsData && <p>v{package_json.version} | {utilsData.release_date}</p>}
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item px-0"}>Blandade småfixar och förbättringar.</li>
                                <li className={"list-group-item px-0"}>Titel - Badge för förlag visas. Förbättrad text om antal publikationer.</li>
                                <li className={"list-group-item px-0"}>Förbättrad användarupplevelse vid byte av lösenord.</li>
                                <li className={"list-group-item px-0"}>Uppdaterad layout av publikationskort.</li>
                                <li className={"list-group-item px-0"}>Ändring av grid för publikationskort - visar nu oftast minst två i bredd.</li>
                                <li className={"list-group-item px-0"}>Förbättrad användarupplevelse för att lägga till och ta bort titlar och publikationer från samlingen.</li>
                                <li className={"list-group-item px-0"}>Funktionalitet för att hantera varianter av publikationer.</li>
                                <li className={"list-group-item px-0"}>Ta bort onödiga bekräftelse meddelanden.</li>
                                <li className={"list-group-item px-0"}>Tooltip och förbättrad tillgänglighet på skickgradering.</li>
                                <li className={"list-group-item px-0"}>Förbättrad visning av Taggar.</li>
                                <li className={"list-group-item px-0"}>Förbättrad alternativ text på bilder.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-section--light"}>
                            <h2>{LABELS_AND_HEADINGS.RELEASE_PREVIOUS}</h2>
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item px-0"}>Länk till marvelklubben sida även i mobilläge.</li>
                                <li className={"list-group-item px-0"}>Förbättrad funktion för byte av e-postadress och lösenord.</li>
                                <li className={"list-group-item px-0"}>Glömt lösenord? - Funktion för att återställa lösenord.</li>
                                <li className={"list-group-item px-0"}>Förbättrad funktion för registrering.</li>
                                <li className={"list-group-item px-0"}>Förbättrat utseende och funktion på publikationskort i lista.</li>
                                <li className={"list-group-item px-0"}>Förbättrad visning av omslagsbild - hanterar olika storlek på originalbild.</li>
                                <li className={"list-group-item px-0"}>Användare kan samla på publikationer.</li>
                                <li className={"list-group-item px-0"}>Användare kan ange skick på de publikationer de samlar på.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        )
        :
        <>
            <HomePublic/>
            <Footer/>
        </>
}
