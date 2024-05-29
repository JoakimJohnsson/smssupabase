import React, {useEffect, useState} from "react";
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import {CONFIG, MAP_CONFIG} from "../../../../helpers/constants/configConstants";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {useAppContext} from "../../../../context/AppContext";
import {Spinner} from "react-bootstrap";

export const SMSMap = () => {

    // https://www.npmjs.com/package/@vis.gl/react-google-maps
    // https://visgl.github.io/react-google-maps/docs/
    // https://visgl.github.io/react-google-maps/examples
    // https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN

    // TODO titta på videos för att göra sök input med autosuggest - och visa
    // TODO titta på videos för att få directions
    // TODO Byta namn på kartor till karta

    const {profile} = useAppContext();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(MAP_CONFIG.POSITIONS.NYKOPING);
    const [positionPending, setPositionPending] = useState(true);
    const [locationAllowedAndSupported, setLocationAllowedAndSupported] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator && profile && profile.allow_location_access) {
            setLocationAllowedAndSupported(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [profile]);

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

        if (locationAllowedAndSupported) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            console.log("Geolocation is not supported by this browser.");
            setPositionPending(false);
        }

    }, [locationAllowedAndSupported]);

    return !positionPending ?
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_CLOUD_API_KEY}>
            {/* Search input form  */}
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                {
                    loading ?
                        <Spinner/>
                        :
                        locationAllowedAndSupported ?
                            <>
                                {/* Allowed and supported - show input and shortcut buttons */}
                                <p>Allowed and supported - show buttons</p>
                            </>
                            :
                            <>
                                {/* NOT allowed and supported - no shortcut buttons */}
                                <p>NOT allowed and supported - no shortcut buttons</p>
                            </>
                }
            </div>
            {/* Map */}
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
        :
        <OverlaySpinner/>
}
