import React from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

export const LocationAccessMap = () => {

    const position = {lat: 53.54, lng: 10}

    return (

        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            <div className={"sms-google-map"}>
                <Map zoom={9} center={position}> </Map>
            </div>
        </APIProvider>

    )
}
