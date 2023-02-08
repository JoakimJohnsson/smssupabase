import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {HeroHeader} from "../header/HeroHeader";
import {Signup} from "../signup/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAxeBattle } from "@fortawesome/pro-duotone-svg-icons";
import { faGrate } from "@fortawesome/pro-regular-svg-icons";
import { faBadgePercent } from "@fortawesome/pro-solid-svg-icons";

export const Home = () => {

    const {loggedIn} = useAppContext();
    return loggedIn ? (
            <main className={"container-fluid main-container dashboard"}>
                <div className={"row"}>
                    <div className={"col row-padding--main"}>
                        <p>Home</p>
                        <p>Länkar till min dashboard o.s.v.</p>
                        <FontAwesomeIcon className={"d-block p-3"} icon={faAxeBattle} size={"3x"}/>
                        <FontAwesomeIcon className={"d-block p-3"} icon={faGrate} size={"3x"}/>
                        <FontAwesomeIcon className={"d-block p-3"} icon={faBadgePercent} size={"3x"}/>
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
