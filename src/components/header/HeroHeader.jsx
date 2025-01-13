import React from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {SkipLink} from "../pages/pagecomponents/SkipLink";
import {
    Icon,
    collectionCheckIconDuoTone,
    collectionPlusIconDuoTone,
    collectionSearchIconDuoTone,
    infoIconDuoTone,
    loginIconDuoTone,
    registerIconDuoTone
} from "../icons";
import {useLogoIcon} from "../../helpers/customHooks/useLogoIcon";
import {IconLinkCtaLg} from "../minis/IconLinkCtaLg.jsx";


export const HeroHeader = () => {

   const {icon} = useLogoIcon();

    return (
        <div className={"sms-hero-header mb-5"}>
            <SkipLink/>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 p-5 d-flex align-items-center justify-content-center flex-column text-center z-2"}>
                        <Icon icon={icon} size={"4x"} className={"fa-icon--cta"}/>
                        <h1 className={"sms-logo-text mb-5"}>
                            {LABELS.COMMON.SVENSKA_MARVELSAMLARE}
                        </h1>
                        <div className={"mb-5"}>
                            <IconLinkCtaLg
                                variant={"primary"}
                                icon={loginIconDuoTone}
                                path={"#login-section"}
                                label={LABELS.COMMON.LOG_IN}
                            />
                            <IconLinkCtaLg
                                variant={"primary"}
                                icon={registerIconDuoTone}
                                path={"#create-account-section"}
                                label={LABELS.COMMON.CREATE_ACCOUNT}
                            />
                            <IconLinkCtaLg
                                variant={"secondary"}
                                icon={infoIconDuoTone}
                                path={"#info-section"}
                                label={LABELS.COMMON.INFORMATION}
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
        </div>
    )
};
