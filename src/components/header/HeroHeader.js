import React from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {
    collectionCheckIconDuoTone,
    collectionPlusIconDuoTone,
    collectionSearchIconDuoTone,
    infoIconDuoTone,
    loginIconDuoTone,
    LogoIconDuoTone,
    registerIconDuoTone
} from "../icons-duotone";
import {SkipLink} from "../pages/pagecomponents/SkipLink";
import {IconLinkCta} from "../minis/IconLinkCta";
import {Icon} from "../icons";


export const HeroHeader = () => {
    return (
        <header className={"sms-hero-header mb-5"}>
            <SkipLink/>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 p-5 d-flex align-items-center justify-content-center flex-column text-center"}>
                        <LogoIconDuoTone size={"4x"} className={"me-2 fa-swap-opacity fa-icon--cta"}/>
                        <h1 className={"sms-logo-text mb-5"}>
                            {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                        </h1>
                        <div className={"mb-5"}>
                            <IconLinkCta
                                variant={"primary"}
                                icon={loginIconDuoTone}
                                path={"#login-section"}
                                label={LABELS_AND_HEADINGS.LOG_IN_CTA}
                            />
                            <IconLinkCta
                                variant={"primary"}
                                icon={registerIconDuoTone}
                                path={"#create-account-section"}
                                label={LABELS_AND_HEADINGS.CREATE_ACCOUNT_CTA}
                            />
                            <IconLinkCta
                                variant={"secondary"}
                                icon={infoIconDuoTone}
                                path={"#info-section"}
                                label={LABELS_AND_HEADINGS.INFORMATION}
                            />
                        </div>

                        <p className={"lead mb-5"}>{TEXTS.DO_YOU_COLLECT}</p>
                        <Icon icon={collectionCheckIconDuoTone} size={"2x"} className={"fa-icon--cta fa-swap-opacity"}/>
                        <p>{TEXTS.MANAGE_YOUR_COLLECTION}</p>
                        <Icon icon={collectionPlusIconDuoTone} size={"2x"} className={"fa-icon--cta fa-swap-opacity"}/>
                        <p>{TEXTS.NEW_TITLES}</p>
                        <Icon icon={collectionSearchIconDuoTone} size={"2x"} className={"fa-icon--cta fa-swap-opacity"}/>
                        <p>{TEXTS.ALWAYS_AVAILABLE}</p>
                    </div>
                </div>
            </div>
        </header>
    )
};
