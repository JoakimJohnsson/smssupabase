import React from "react";
import {Alert} from "react-bootstrap";
import {ALERT_VARIANTS, VARIANT_MAPPER} from "../../helpers/constants/configConstants";


export const InformationAlert = ({variant, text}) => {
    let alertIcon;
    try {
        alertIcon = ALERT_VARIANTS[VARIANT_MAPPER[variant]].icon;
    } catch (error) {
        console.error("No alert icon found for variant: " + variant + " - ", error)
    }

    return alertIcon && (
        <Alert variant={variant} className={"d-flex align-items-center mb-5"}>
            <div>
                {alertIcon}
            </div>
            <p className={"m-0"}>{text}</p>
        </Alert>
    )
}
