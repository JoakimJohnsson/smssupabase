import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../headings";
import {HomePublic} from "./HomePublic";


export const Home = () => {

    const {user} = useAppContext();

    return user && user.id ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <div className={"col row-padding--main"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.WELCOME}/>
                    </div>
                </div>
            </main>
        )
        :
        <HomePublic/>
}
