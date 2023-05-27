import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {Icon} from "../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";
import {InformationAlert} from "../minis/InformationAlert";


export const Home = () => {

    const {user, profile} = useAppContext();
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    useEffect(() => {
        if(profile) {
            if(!profile.firstname || !profile.lastname || !profile.image_filename) {
                setShowAlert(true);
                setAlertText(TEXTS.ALERT_HOME_NAME_INFO);
            } else if (!profile.is_public) {
                setShowAlert(true);
                setAlertText(TEXTS.ALERT_HOME_IS_PUBLIC_INFO);
            }
        }
    }, [profile])

    return user && user.id ? (
            <main id="main-content" className={"container-fluid main-container dashboard"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col--full"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.WELCOME}/>
                        {
                            showAlert &&
                            <InformationAlert variant={"info"} text={alertText}/>
                        }
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
                </div>
            </main>
        )
        :
        <>
            <HomePublic/>
            <Footer/>
        </>
}
