import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, LOGO_ICONS, TEXTS} from "../../helpers/constants/configConstants";
import {SkipLink} from "../pages/pagecomponents/SkipLink";
import {IconLinkCta} from "../minis/IconLinkCta";
import {
    Icon,
    collectionCheckIconDuoTone,
    collectionPlusIconDuoTone,
    collectionSearchIconDuoTone,
    infoIconDuoTone,
    loginIconDuoTone,
    registerIconDuoTone
} from "../icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const HeroHeader = () => {

    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * LOGO_ICONS.length);
        setIcon(LOGO_ICONS[randomIndex]);
    }, []);

    return (
        <header className={"sms-hero-header mb-5"}>
            <SkipLink/>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12 p-5 d-flex align-items-center justify-content-center flex-column text-center"}>
                        <Icon icon={icon} size={"4x"} className={"me-2 fa-swap-opacity fa-icon--cta"}/>
                        <h1 className={"sms-logo-text mb-5"}>
                            {LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}
                        </h1>
                        <div className={"mb-5"}>
                            <IconLinkCta
                                variant={"primary"}
                                icon={loginIconDuoTone}
                                path={"#login-section"}
                                label={LABELS.COMMON.LOG_IN}
                            />
                            <IconLinkCta
                                variant={"primary"}
                                icon={registerIconDuoTone}
                                path={"#create-account-section"}
                                label={LABELS.COMMON.CREATE_ACCOUNT}
                            />
                            <IconLinkCta
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
        </header>
    )
};
