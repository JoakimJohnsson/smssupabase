import React from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

export const LocationAccessMap = () => {

    // https://www.npmjs.com/package/@vis.gl/react-google-maps
    // https://visgl.github.io/react-google-maps/docs/
    // https://visgl.github.io/react-google-maps/examples

    const position = {lat: 53.54, lng: 10}

    return (

        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            <div className={"sms-google-map"}>
                <Map zoom={9} center={position}> </Map>
            </div>
        </APIProvider>

    )
}
