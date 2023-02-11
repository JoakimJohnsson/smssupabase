import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import {HeadingWithBreadCrumbs} from "../headings";


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
        (
            <>
                <HeroHeader/>
                <main className={"container-fluid p-5"}>
                    <div className={"row justify-content-center pb-5 mb-5"}>
                        <div className={"col-12 col-md-6 d-flex flex-column"}>
                            <div className={"align-self-center mb-4 d-flex align-items-center flex-column"}>
                                <h2 className={"fs-1 mb-4"} id={"create-account-section"}>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                            </div>
                            <Signup/>
                        </div>
                    </div>
                </main>
            </>
        )
}
