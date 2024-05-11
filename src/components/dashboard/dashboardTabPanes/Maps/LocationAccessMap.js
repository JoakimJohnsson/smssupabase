import React from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import {MAP_POSITIONS} from "../../../../helpers/constants/configConstants";

export const LocationAccessMap = () => {

    // https://www.npmjs.com/package/@vis.gl/react-google-maps
    // https://visgl.github.io/react-google-maps/docs/
    // https://visgl.github.io/react-google-maps/examples

    const position = MAP_POSITIONS.NYKOPING;

    return (

        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            <div className={"sms-google-map"}>
                <Map zoom={9} center={position}> </Map>
            </div>
        </APIProvider>

    )
}
