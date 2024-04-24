import React from "react";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants/configConstants";
import {Icon} from "../icons";
import {Link} from "react-router-dom";
import {useLogoIcon} from "../../helpers/customHooks/useLogoIcon";


export const NavigationLogo = () => {

    const {icon} = useLogoIcon();

    return icon && (
        <Link to={ROUTES.DEFAULT} className={"hocus-standard h-100 d-flex align-items-center"}>
            {/* desktop icon */}
            <Icon icon={icon} size={"3x"} className={"mx-3 text-grade d-none d-sm-flex"}/>
            {/* mobile icon */}
            <Icon icon={icon} size={"3x"} className={"ms-2 me-3 text-grade d-flex d-sm-none"}/>
            <div className={"sms-logo-text"}>
                <span className={"d-none d-sm-inline"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                <span className={"d-inline d-sm-none"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
            </div>
        </Link>
    )
};
