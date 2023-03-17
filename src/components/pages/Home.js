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
                                <li className={"list-group-item px-0"}>Förberett funktionalitet för skickgradering (WIP).</li>
                                <li className={"list-group-item px-0"}>Badges för skickgradering, marvelklubben, format och land.</li>
                                <li className={"list-group-item px-0"}>Nya färger för olika badges.</li>
                                <li className={"list-group-item px-0"}>Nytt titelkort.</li>
                                <li className={"list-group-item px-0"}>Visa bild i listor istället för ikoner.</li>
                                <li className={"list-group-item px-0"}>Möjlighet att bläddra till nästa / föregående publikation.</li>
                            </ul>
                        </div>
                    </div>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-section--light"}>
                            <h2>{LABELS_AND_HEADINGS.RELEASE_LATEST}</h2>
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item px-0"}>Lista titlar utgivna av förlaget på dess sida.</li>
                                <li className={"list-group-item px-0"}>Visa tooltip på knappar för att lägga till titel eller publikation till
                                    samlingen.
                                </li>
                                <li className={"list-group-item px-0"}>Förbättrad responsivitet på verktygsknappar i listor.</li>
                                <li className={"list-group-item px-0"}>Snyggare och rakare laddsnurra.</li>
                                <li className={"list-group-item px-0"}>Användare kan nu lägga till titlar till samlingen.</li>
                                <li className={"list-group-item px-0"}>Visa information om releaser och kommande förbättringar på startsidan.</li>
                                <li className={"list-group-item px-0"}>Småfixar och andra förbättringar.</li>
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
