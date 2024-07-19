import React, {useEffect, useState} from "react";
import {Map} from "@vis.gl/react-google-maps";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Form} from "react-bootstrap";
import {SmsMapDirections} from "./SmsMapDirections";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {SmsMapMarker} from "./SmsMapMarker";
import {getLocationFromPosition, getPositionFromLocation} from "../../../../helpers/functions";
import {DestinationSelector} from "./smsMapControls/DestinationSelector";
import {useUserPosition} from "../../../../helpers/customHooks/useUserPosition";
import {DestinationSearch} from "./smsMapControls/DestinationSearch";
import {useMapsApi} from "../../../../helpers/customHooks/useMapsApi";
import {UserLocation} from "./smsMapControls/UserLocation";
import {SelectedOriginLocation} from "./smsMapControls/SelectedOriginLocation";
import {MAP_CONFIG} from "../../../../helpers/constants/configConstants";
import {useGeocoder} from "../../../../helpers/customHooks/useGeocoder";
import {LocationSelector} from "./smsMapControls/LocationSelector";
import {Icon, infoIconDuoTone} from "../../../icons";


export const SmsMap = () => {

    const {userLocation, positionPending, locationAllowedAndSupported} = useUserPosition();
    const {geocoder} = useGeocoder();
    const {mapTypeControlOptions} = useMapsApi();
    const [destinations, setDestinations] = useState([]);
    const [travelModeIndex, setTravelModeIndex] = useState(0);
    const [selectedDestinationLocation, setSelectedDestinationLocation] = useState(null);
    const [otherLocation, setOtherLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [selectedDestinationType, setSelectedDestinationType] = useState(null);

    useEffect(() => {

        const fetchDefaultLocation = async () => {
            try {
                const result = await getLocationFromPosition(geocoder, MAP_CONFIG.POSITIONS.NYKOPING);
                setLocation(result);
            } catch (error) {
                console.error('Error fetching user location: ', error);
            }
        }

        if (!locationAllowedAndSupported) {
            // Set default location. Not really necessary, but fun.
            // User can search for other locations.
            fetchDefaultLocation().then();
        } else {
            // Location is set to user position.
            // User can still search for other locations to use for location.
            setOtherLocation(null);
        }
    }, [geocoder, locationAllowedAndSupported]);

    // If user has set other location - use other location.
    useEffect(() => {
        if (otherLocation) {
            setLocation(otherLocation);
        } else {
            setLocation(userLocation);
        }
    }, [locationAllowedAndSupported, otherLocation, userLocation]);

    return !positionPending ?
        <>
            <div className={"col-12 form-group mb-5 bg-horse p-4"}>
                <h2>{PANES.MAP.LOCATION}</h2>
                {/* If allowed - show user location */}
                <div className={"mb-4"}>
                    {
                        locationAllowedAndSupported &&
                        <UserLocation/>
                    }
                    <SelectedOriginLocation selectedOrigin={otherLocation}/>
                </div>
                <div className={"alert alert-info d-flex align-items-center mb-4"}>
                    <Icon icon={infoIconDuoTone} className={"me-3"} size={"2x"}/>
                    {PANES.MAP.DISCLAIMER}
                </div>
                {
                    <LocationSelector setLocation={setOtherLocation}/>
                }

                {/* Nearest destination search */}
                {
                    location &&
                    <DestinationSearch position={getPositionFromLocation(location)}
                                       setDestinations={setDestinations}
                                       setSelectedDestinationType={setSelectedDestinationType}
                                       selectedDestinationType={selectedDestinationType}/>
                }


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
                {
                    location &&
                    <Map
                        fullscreenControl={false}
                        defaultZoom={12}
                        defaultCenter={getPositionFromLocation(location)}
                        mapId={process.env.REACT_APP_GOOGLE_CLOUD_SMS_LOCATION_ACCESS_MAP_ID}
                        mapTypeControl={false}
                        mapTypeControlOptions={mapTypeControlOptions}
                        streetViewControl={false}
                    >
                        {/* Add markers */}
                        {
                            location && selectedDestinationLocation ?
                                <SmsMapDirections origin={getPositionFromLocation(location)}
                                                  destination={getPositionFromLocation(selectedDestinationLocation)}
                                                  travelModeIndex={travelModeIndex}/>
                                :
                                <SmsMapMarker position={getPositionFromLocation(location)}/>
                        }
                    </Map>
                }
            </div>
        </>
        :
        <OverlaySpinner/>
}
