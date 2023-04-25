import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";
import {Icon} from "../icons";
import {faMailboxFlagUp} from "@fortawesome/pro-regular-svg-icons";


export const Home = () => {

    const {user} = useAppContext();

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
                </div>
            </main>
        )
        :
        <>
            <HomePublic/>
            <Footer/>
        </>
}
