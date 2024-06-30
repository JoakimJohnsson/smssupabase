import React, {useState} from "react";
import {Map} from "@vis.gl/react-google-maps";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Form} from "react-bootstrap";
import {Directions} from "./Directions";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {Icon, infoIconDuoTone} from "../../../icons";
import {SMSMapMarker} from "./SMSMapMarker";
import {getLocation} from "../../../../helpers/functions";
import {DestinationSelector} from "./DestinationSelector";
import {LazyTextPlaceholder} from "../../../minis/LazyTextPlaceholder";
import {useUserPosition} from "../../../../helpers/customHooks/useUserPosition";
import {DestinationSearch} from "./DestinationSearch";
import {useMapsApi} from "../../../../helpers/customHooks/useMapsApi";


export const SMSMap = () => {
    const {userPosition, positionPending, userLocation, locationAllowedAndSupported} = useUserPosition();
    const {mapsApi, mapTypeControlOptions} = useMapsApi();
    const [destinations, setDestinations] = useState([]);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedDestinationType, setSelectedDestinationType] = useState(null);

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

                            {/* Nearest destination search */}
                            <DestinationSearch userPosition={userPosition} mapsApi={mapsApi} setDestinations={setDestinations}
                                               setSelectedDestinationType={setSelectedDestinationType}
                                               selectedDestinationType={selectedDestinationType}/>

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
