import React from "react";
import {AdvancedMarker} from "@vis.gl/react-google-maps";
import {SmsMapCustomPin} from "./SmsMapCustomPin.jsx";


export const SmsMapMarker = ({position, isDestination = false}) => {

    return position && (
        <AdvancedMarker position={position}>
            <SmsMapCustomPin position={position} isDestination={isDestination} />
        </AdvancedMarker>
    )
}
