import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {LoginIconDuoTone, LogoIconDuoTone, RegisterIconDuoTone} from "../icons-duotone";

export const HeroHeader = () => {
    return (
        <div className={"sms-hero-header mb-5"}>
            <div className={"container-fluid"}>
                <div className={"row"}>

                    <div className={"col-12 p-5 d-flex align-items-center justify-content-center flex-column text-center"}>
                        <LogoIconDuoTone size={"4x"} className={"me-2 fa-swap-opacity text-secondary mb-2"}/>
                        <p className={"sms-logo-text mb-5"}>
                            {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                        </p>
                        <h1 className={"text-primary mb-5"}>
                            {LABELS_AND_HEADINGS.WELCOME}
                        </h1>
                        <div className={"mb-5"}>
                            <a href={"#login-section"} className={"btn btn-primary btn-cta d-block d-md-inline-block mb-4 me-0 me-md-3"}>
                                <LoginIconDuoTone className={"btn-cta--icon"}/>{LABELS_AND_HEADINGS.LOG_IN_CTA}
                            </a>
                            <a href={"#create-account-section"} className={"btn btn-primary btn-cta d-block d-md-inline-block mb-4"}>
                                <RegisterIconDuoTone className={"btn-cta--icon"}/>{LABELS_AND_HEADINGS.CREATE_ACCOUNT_CTA}
                            </a>
                        </div>
                        <p className={"lead mb-4"}>{TEXTS.DO_YOU_COLLECT}</p>
                            <p>{TEXTS.MANAGE_YOUR_COLLECTION}</p>
                            <p>{TEXTS.NEW_TITLES}</p>
                            <p>{TEXTS.ALWAYS_AVAILABLE}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
