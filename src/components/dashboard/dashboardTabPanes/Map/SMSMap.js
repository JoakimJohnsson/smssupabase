import React, {useEffect, useState} from "react";
import {Map, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {CONFIG, MAP_CONFIG} from "../../../../helpers/constants/configConstants";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {useAppContext} from "../../../../context/AppContext";
import {Form, Spinner} from "react-bootstrap";
import {Directions} from "./Directions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCar, faWalking} from "@fortawesome/pro-regular-svg-icons";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone} from "../../../icons";

export const SMSMap = () => {
    const {profile} = useAppContext();
    const map = useMap();
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(MAP_CONFIG.POSITIONS.NYKOPING);
    const [destination, setDestination] = useState(MAP_CONFIG.POSITIONS.NYKOPING);
    const [positionPending, setPositionPending] = useState(true);
    const [locationAllowedAndSupported, setLocationAllowedAndSupported] = useState(false);
    const [mapTypeControlOptions, setMapTypeControlOptions] = useState({});
    const [mapsApi, setMapsApi] = useState(null);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    const placesLibrary = useMapsLibrary("places");
    // Use null as default to avoid runtime errors.
    const [placesService, setPlacesService] = useState(null);

    // https://visgl.github.io/react-google-maps/docs/guides/interacting-with-google-maps-api#hooks
    // Initialize mapsAPI and places service
    useEffect(() => {
        // Early exit.
        if (!map || !placesLibrary) return;
        // Now you can interact with the imperative maps API.
        // https://developers.google.com/maps/documentation/javascript/reference/map
        setMapsApi(window.google.maps);
        if (mapsApi) {
            setMapTypeControlOptions({
                style: mapsApi.MapTypeControlStyle.DEFAULT,
                mapTypeIds: [mapsApi.MapTypeId.ROADMAP]
            });
            setPlacesService(new placesLibrary.PlacesService(map));
        }
    }, [map, mapsApi, placesLibrary]);

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

    const handlePlacesSearch = (request) => {
        placesService.nearbySearch(
            {
                location: position,
                language: "sv",
                keyword: request.query,
                rankBy: mapsApi.places.RankBy.DISTANCE
            }
            , (results, status) => {
                if (status === "OK" && results) {
                    for (let i = 0; i < results.length; i++) {
                        console.log(results[i].name);
                    }
                }
            });
    }

    return !positionPending ?
        <>
            {/* Search input form  */}
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                {
                    loading ?
                        <Spinner/>
                        :
                        locationAllowedAndSupported ?
                            <>
                                {/* Allowed and supported */}
                                <button
                                    className={"sms-btn btn btn-primary"}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.FLEA_MARKET)}
                                >
                                    {PANES.MAP.FLEA_MARKETS}
                                </button>
                                <button
                                    className={"sms-btn btn btn-secondary"}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.SECOND_HAND)}
                                >
                                    {PANES.MAP.SECOND_HAND_SHOPS}
                                </button>
                                <button
                                    className={"sms-btn btn btn-info"}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE)}
                                >
                                    {PANES.MAP.COMIC_BOOK_STORES}
                                </button>
                                {/* Travel mode selector */}
                                <Form>
                                    <div className="mb-3">
                                        <Form.Check
                                            type={"radio"}
                                            id={"0"}
                                            name={"travelMode"}
                                            label={<span><FontAwesomeIcon icon={faWalking}/> Promenad</span>}
                                            checked={travelModeIndex === 0}
                                            onChange={() => setTravelModeIndex(0)}
                                        />
                                        <Form.Check
                                            type={"radio"}
                                            id={"1"}
                                            label={<span><FontAwesomeIcon icon={faCar}/> Åka bil</span>}
                                            checked={travelModeIndex === 1}
                                            onChange={() => setTravelModeIndex(1)}
                                        />
                                    </div>
                                </Form>
                            </>
                            :
                            // NOT allowed and supported
                            <p className={"alert alert-info d-flex align-items-center m-0"}>
                                <Icon icon={infoIconDuoTone} className={"me-3"} size={"2x"}/>
                                {PANES.MAP.NO_LOCATION_ACCESS}
                            </p>
                }
            </div>
            {/* Map */}
            {
                locationAllowedAndSupported &&
                <div className={"sms-google-map"}>
                    <Map
                        /*
                        Available options:
                        https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
                        defaultCenter
                        defaultHeading
                        defaultTilt
                        defaultZoom
                        */
                        fullscreenControl={false}
                        defaultZoom={12}
                        defaultCenter={position}
                        mapId={process.env.REACT_APP_GOOGLE_CLOUD_SMS_LOCATION_ACCESS_MAP_ID}
                        mapTypeControl={false}
                        mapTypeControlOptions={mapTypeControlOptions}
                        streetViewControl={false}
                    >
                        {
                            position && destination &&
                            <Directions mapsApi={mapsApi} origin={position} destination={destination} travelModeIndex={travelModeIndex}/>
                        }
                    </Map>
                </div>
            }
        </>
        :
        <OverlaySpinner/>
}
