import React from "react";
import {Alert} from "react-bootstrap";
import {ALERT_VARIANTS, VARIANT_MAPPER} from "../../helpers/constants";


export const InformationAlert = ({variant, text}) => {
    let alertIcon;
    try {
        alertIcon = ALERT_VARIANTS[VARIANT_MAPPER[variant]].icon;
    } catch (error) {
        console.error("No alert icon found for variant: " + variant)
    }

    return alertIcon && (
        <Alert variant={variant} className={"d-flex align-items-center"}>
            <div>
                {alertIcon}
            </div>
            <p className={"m-0"}>{text}</p>
        </Alert>
    )
}
