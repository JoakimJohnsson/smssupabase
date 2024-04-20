import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, LOGO_ICONS, ROUTES} from "../../helpers/constants/configConstants";
import {Icon} from "../icons";
import {Link} from "react-router-dom";


export const NavigationLogo = () => {

    const [icon, setIcon] = useState(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * LOGO_ICONS.length);
        setIcon(LOGO_ICONS[randomIndex]);
    }, []);

    return icon && (
        <Link to={ROUTES.DEFAULT} className={"hocus-standard h-100 d-flex align-items-center"}>
            {/* desktop icon */}
            <Icon icon={icon} size={"3x"} className={"mx-3 fa-sharp fa-thin text-grade d-none d-sm-flex"}/>
            {/* mobile icon */}
            <Icon icon={icon} size={"2x"} className={"mx-2 fa-sharp fa-thin text-grade d-flex d-sm-none"}/>
            <div className={"sms-logo-text"}>
                <span className={"d-none d-sm-inline"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE}</span>
                <span className={"d-inline d-sm-none"}>{LABELS_AND_HEADINGS.SVENSKA_MARVELSAMLARE_SHORT}</span>
            </div>
        </Link>
    )
};
