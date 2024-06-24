import React, {useEffect, useState} from "react";
import {Map} from "@vis.gl/react-google-maps";
import {LABELS_AND_HEADINGS, MAP_CONFIG} from "../../../../helpers/constants/configConstants";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Form} from "react-bootstrap";
import {Directions} from "./Directions";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone} from "../../../icons";
import {SMSMapMarker} from "./SMSMapMarker";
import {getLocation} from "../../../../helpers/functions";
import {DestinationSelector} from "./DestinationSelector";
import {IconButton} from "../../../minis/IconButton";
import {faDeleteLeft} from "@fortawesome/pro-solid-svg-icons";
import {LazyTextPlaceholder} from "../../../minis/LazyTextPlaceholder";
import {usePlacesService} from "../../../../helpers/customHooks/usePlacesService";
import {useUserPosition} from "../../../../helpers/customHooks/useUserPosition";


export const SMSMap = () => {
    const {placesService} = usePlacesService();
    const {userPosition, positionPending, userLocation, locationAllowedAndSupported} = useUserPosition();
    const [destinations, setDestinations] = useState([]);
    const [mapTypeControlOptions, setMapTypeControlOptions] = useState({});
    const [mapsApi, setMapsApi] = useState(null);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    // Use null as default to avoid runtime errors.
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedDestinationType, setSelectedDestinationType] = useState(null);

    // https://visgl.github.io/react-google-maps/docs/guides/interacting-with-google-maps-api#hooks
    // Initialize mapsAPI
    useEffect(() => {
        // Now you can interact with the imperative maps API.
        // https://developers.google.com/maps/documentation/javascript/reference/map
        setMapsApi(window.google?.maps);
        if (mapsApi) {
            setMapTypeControlOptions({
                style: mapsApi.MapTypeControlStyle.DEFAULT,
                mapTypeIds: [mapsApi.MapTypeId.ROADMAP]
            });
        }

    }, [mapsApi]);

    const handlePlacesSearch = (request) => {
        if (!placesService) return;
        placesService.nearbySearch(
            {
                location: userPosition,
                language: "sv",
                keyword: request.query,
                rankBy: mapsApi.places.RankBy.DISTANCE
            }
            , (results, status) => {
                if (status === "OK" && results) {
                    setDestinations(results);
                    setSelectedDestinationType(request.name);
                }
            });
    }

    const handleReset = () => {
        setDestinations(null);
        setSelectedDestinationType(null);
    }

    return !positionPending ?
        <>
            {/* Search input form  */}
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                {
                    locationAllowedAndSupported ?
                        <>
                            {/* Allowed and supported */}
                            <h2>{PANES.MAP.CURRENT_LOCATION}</h2>
                            <p>
                                {PANES.MAP.YOUR_CURRENT_LOCATION} {
                                userLocation ?
                                    userLocation.formatted_address
                                    :
                                    <LazyTextPlaceholder charCount={12}/>
                            }
                            </p>
                            <h2>{PANES.MAP.SEARCH_FOR_NEAREST}</h2>
                            <div className={"my-3"}>
                                <button
                                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.FLEA_MARKET.name ? "btn-country" : "btn-outline-country"}`}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.FLEA_MARKET)}
                                >
                                    {PANES.MAP.FLEA_MARKETS}
                                </button>
                                <button
                                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.SECOND_HAND.name ? "btn-country" : "btn-outline-country"}`}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.SECOND_HAND)}
                                >
                                    {PANES.MAP.SECOND_HAND_SHOPS}
                                </button>
                                <button
                                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE.name ? "btn-country" : "btn-outline-country"}`}
                                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE)}
                                >
                                    {PANES.MAP.COMIC_BOOK_STORES}
                                </button>
                                {
                                    selectedDestinationType &&
                                    <IconButton
                                        variant={"outline-country"}
                                        label={LABELS_AND_HEADINGS.RESET}
                                        icon={faDeleteLeft}
                                        onClick={handleReset}
                                    />
                                }
                            </div>
                            {/* Destination selector */}
                            {
                                destinations && !!destinations.length &&
                                <DestinationSelector
                                    selectedDestinationType={selectedDestinationType}
                                    setSelectedDestination={setSelectedDestination}
                                    destinations={destinations}
                                    selectedDestination={selectedDestination}
                                />
                            }
                            {/* Travel mode selector */}
                            {
                                selectedDestination &&
                                <Form>
                                    <h2>{PANES.MAP.TRAVEL_MODES}</h2>
                                    <div className="mb-3">
                                        <Form.Check
                                            type={"radio"}
                                            id={"0"}
                                            name={"travelMode"}
                                            label={<span>{PANES.MAP.WALKING}</span>}
                                            checked={travelModeIndex === 0}
                                            onChange={() => setTravelModeIndex(0)}
                                        />
                                        <Form.Check
                                            type={"radio"}
                                            id={"1"}
                                            name={"travelMode"}
                                            label={<span>{PANES.MAP.DRIVING}</span>}
                                            checked={travelModeIndex === 1}
                                            onChange={() => setTravelModeIndex(1)}
                                        />
                                    </div>
                                </Form>
                            }
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
                        fullscreenControl={false}
                        defaultZoom={12}
                        defaultCenter={userPosition}
                        mapId={process.env.REACT_APP_GOOGLE_CLOUD_SMS_LOCATION_ACCESS_MAP_ID}
                        mapTypeControl={false}
                        mapTypeControlOptions={mapTypeControlOptions}
                        streetViewControl={false}
                    >
                        {/* Add markers */}
                        {
                            userPosition && selectedDestination ?
                                <Directions mapsApi={mapsApi} origin={userPosition} destination={getLocation(selectedDestination)}
                                            travelModeIndex={travelModeIndex}/>
                                :
                                <SMSMapMarker position={userPosition}/>
                        }
                    </Map>
                </div>
            }
        </>
        :
        <OverlaySpinner/>
}
