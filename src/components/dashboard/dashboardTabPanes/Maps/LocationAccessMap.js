import React, {useEffect, useState} from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import {CONFIG, MAP_CONFIG} from "../../../../helpers/constants/configConstants";

export const LocationAccessMap = () => {

    // https://www.npmjs.com/package/@vis.gl/react-google-maps
    // https://visgl.github.io/react-google-maps/docs/
    // https://visgl.github.io/react-google-maps/examples
    // https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN

    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(MAP_CONFIG.POSITIONS.NYKOPING);
    const [positionPending, setPositionPending] = useState(true);

    // Getting users current position
    useEffect(() => {
        setPositionPending(true);
        const success = (position) => {
            setPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setPositionPending(false);
        };
        const error = (error) => {
            console.error('Error occurred while getting location: ' + error.message);
            setPositionPending(false);
        };
        const options = {
            timeout: CONFIG.TIMEOUT_MEGA_XXL
        };
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            console.log("Geolocation is not supported by this browser.");
            setPositionPending(false);
        }
    }, []);

    return !positionPending && (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            <div className={"sms-google-map"}>
                <Map defaultZoom={9} defaultCenter={position} mapId={process.env.REACT_APP_GOOGLE_CLOUD_SMS_LOCATION_ACCESS_MAP_ID}>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin background={MAP_CONFIG.COLORS.PIN_BACKGROUND}
                             borderColor={MAP_CONFIG.COLORS.PIN_BORDER}
                             glyphColor={MAP_CONFIG.COLORS.PIN_GLYPH}/>
                    </AdvancedMarker>
                    {
                        open &&
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                        <p className={"text-black"}>Hej!</p>
                        </InfoWindow>
                    }
                </Map>
            </div>
        </APIProvider>
    )
}
