import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";
import Footer from "../Footer";


export const Home = () => {

    const {user} = useAppContext();

    return user && user.id ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.WELCOME}/>
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
