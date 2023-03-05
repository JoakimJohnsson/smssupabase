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
                                <h2>Senaste releasen</h2>
                                {utilsData && <p>v{package_json.version} | {utilsData.release_date}</p>}
                                <ul className={"list-group list-group-flush"}>
                                    <li className={"list-group-item px-0"}>Småfixar och förbättringar</li>
                                </ul>
                            </div>
                        </div>
                        <div className={"sms-dashboard-col"}>
                            <div className={"sms-section--light"}>
                                <h2>Kommande release</h2>
                                <ul className={"list-group list-group-flush"}>
                                    <li className={"list-group-item px-0"}>Småfixar och förbättringar</li>
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
