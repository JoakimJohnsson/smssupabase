import React, {useEffect, useState} from "react";
import {Map} from "@vis.gl/react-google-maps";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Form} from "react-bootstrap";
import {SmsMapDirections} from "./SmsMapDirections";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {SmsMapMarker} from "./SmsMapMarker";
import {getLocation} from "../../../../helpers/functions";
import {DestinationSelector} from "./smsMapControls/DestinationSelector";
import {useUserPosition} from "../../../../helpers/customHooks/useUserPosition";
import {DestinationSearch} from "./smsMapControls/DestinationSearch";
import {useMapsApi} from "../../../../helpers/customHooks/useMapsApi";
import {CurrentUserLocation} from "./smsMapControls/CurrentUserLocation";
import {SelectedOrigin} from "./smsMapControls/SelectedOrigin";


export const SmsMap = () => {
    // TODO
    //  - använd user location istället för user position!!!!
    //  - user position ska vara null - inte nyköping
    const {userPosition, positionPending, locationAllowedAndSupported} = useUserPosition();
    const {mapsApi, mapTypeControlOptions} = useMapsApi();
    const [destinations, setDestinations] = useState([]);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestinationType, setSelectedDestinationType] = useState(null);

    // TODO - Reda ut position / origin o.s.v. om man inte har tillåtit o.s.v.

    useEffect(() => {
        setSelectedOrigin(null);
    }, []);

    return !positionPending ?
        <>
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                <h2>{PANES.MAP.LOCATION}</h2>
                {/* If allowed - show user location */}
                {
                    locationAllowedAndSupported &&
                    <CurrentUserLocation/>
                }
                <SelectedOrigin selectedOrigin={selectedOrigin}/>
                {
                    <>
                    <h3>{locationAllowedAndSupported ? PANES.MAP.CHOSE_OTHER_LOCATION : PANES.MAP.CHOSE_LOCATION}</h3>
                    <p>Platsväljare med autocomplete</p>
                    </>
                }

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
            </div>
            {/* Map */}
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
                                <SmsMapDirections mapsApi={mapsApi} origin={userPosition} destination={getLocation(selectedDestination)}
                                                  travelModeIndex={travelModeIndex}/>
                                :
                                <SmsMapMarker position={userPosition}/>
                        }
                    </Map>
                </div>

        </>
        :
        <OverlaySpinner/>
}
