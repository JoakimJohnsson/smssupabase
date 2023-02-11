import React from "react";
import Login from "../Login";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {LogoIconDuoTone} from "../icons-duotone";

export const HeroHeader = () => {
    return (
        <div className={"sms-hero-header mb-5"}>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 col-xl-6 p-5 bg-whale d-flex align-items-center flex-column justify-content-center"}>
                        <div className={"col-12 col-lg-8 d-flex flex-column mb-5"}>
                            <div className={"d-flex flex-column align-items-center py-5"}>
                                <LogoIconDuoTone size={"4x"} className={"me-2 fa-swap-opacity text-secondary d-none d-sm-flex mb-2"}/>
                                <p className={"sms-logo-text"}>
                                    {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                                </p>
                            </div>
                            <Login/>
                        </div>
                        <a href={"#create-account-section"} className={"btn btn-primary btn-cta mb-5"}>
                            {LABELS_AND_HEADINGS.CREATE_ACCOUNT_CTA}
                        </a>
                    </div>
                    <div className={"col-12 col-xl-6 p-5 d-flex align-items-center justify-content-center flex-column text-center"}>
                        <h1 className={"text-primary"}>
                            {LABELS_AND_HEADINGS.WELCOME}
                        </h1>
                        <p className={"lead mb-5"}>{TEXTS.DO_YOU_COLLECT}</p>
                        <div className={"mb-4"}>
                            <p>{TEXTS.MANAGE_YOUR_COLLECTION}</p>
                        </div>
                        <div className={"mb-4"}>
                            <p>{TEXTS.NEW_TITLES}</p>
                        </div>
                        <div>
                            <p>{TEXTS.ALWAYS_AVAILABLE}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
