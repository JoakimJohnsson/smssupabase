import React, {useEffect, useState} from "react";
import {Map} from "@vis.gl/react-google-maps";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Form} from "react-bootstrap";
import {SmsMapDirections} from "./SmsMapDirections";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {SmsMapMarker} from "./SmsMapMarker";
import {getPositionFromLocation} from "../../../../helpers/functions";
import {DestinationSelector} from "./smsMapControls/DestinationSelector";
import {useUserPosition} from "../../../../helpers/customHooks/useUserPosition";
import {DestinationSearch} from "./smsMapControls/DestinationSearch";
import {useMapsApi} from "../../../../helpers/customHooks/useMapsApi";
import {UserLocation} from "./smsMapControls/UserLocation";
import {SelectedOriginLocation} from "./smsMapControls/SelectedOriginLocation";


export const SmsMap = () => {

    const {userLocation, positionPending, locationAllowedAndSupported} = useUserPosition();
    const {mapsApi, mapTypeControlOptions} = useMapsApi();
    const [destinations, setDestinations] = useState([]);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState(null);
    const [otherLocation, setOtherLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [selectedDestinationType, setSelectedDestinationType] = useState(null);

    useEffect(() => {
        setOtherLocation(null);
    }, []);

    // If user has set other location - use other location.
    useEffect(() => {
        if (otherLocation) {
            setLocation(otherLocation);
        } else {
            setLocation(userLocation);
        }
    }, [otherLocation, userLocation]);

    return !positionPending && location ?
        <>
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                <h2>{PANES.MAP.LOCATION}</h2>
                {/* If allowed - show user location */}
                <div className={"mb-4"}>
                {
                    locationAllowedAndSupported &&
                    <UserLocation/>
                }
                {
                    otherLocation &&
                    <SelectedOriginLocation selectedOrigin={otherLocation}/>
                }
                </div>
                {
                    <>
                    <h3>{locationAllowedAndSupported ? PANES.MAP.CHOSE_OTHER_LOCATION : PANES.MAP.CHOSE_LOCATION}</h3>
                    <p>Platsväljare med autocomplete</p>
                    </>
                }

                {/* Nearest destination search */}
                <DestinationSearch userPosition={getPositionFromLocation(location)} mapsApi={mapsApi} setDestinations={setDestinations}
                                   setSelectedDestinationType={setSelectedDestinationType}
                                   selectedDestinationType={selectedDestinationType}/>

                {/* Destination selector */}
                {
                    destinations && !!destinations.length &&
                    <DestinationSelector
                        selectedDestinationType={selectedDestinationType}
                        setSelectedDestination={setSelectedDestinationLocation}
                        destinations={destinations}
                        selectedDestination={selectedDestinationLocation}
                    />
                }

                {/* Travel mode selector */}
                {
                    selectedDestinationLocation &&
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
                        defaultCenter={getPositionFromLocation(userLocation)}
                        mapId={process.env.REACT_APP_GOOGLE_CLOUD_SMS_LOCATION_ACCESS_MAP_ID}
                        mapTypeControl={false}
                        mapTypeControlOptions={mapTypeControlOptions}
                        streetViewControl={false}
                    >
                        {/* Add markers */}
                        {
                            userLocation && selectedDestinationLocation ?
                                <SmsMapDirections mapsApi={mapsApi} origin={getPositionFromLocation(userLocation)} destination={getPositionFromLocation(selectedDestinationLocation)}
                                                  travelModeIndex={travelModeIndex}/>
                                :
                                <SmsMapMarker position={getPositionFromLocation(userLocation)}/>
                        }
                    </Map>
                </div>

        </>
        :
        <OverlaySpinner/>
}
