import React, {useEffect, useState} from "react";
import {useMap} from "@vis.gl/react-google-maps";
import {SMSMapMarker} from "./SMSMapMarker";
import {carIconDuoTone, Icon, walkingIconDuoTone} from "../../../icons";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {useDirectionsService} from "../../../../helpers/customHooks/useDirectionsService";


export const Directions = ({mapsApi, origin, destination, travelModeIndex, directionsRenderer}) => {
    const map = useMap();
    const {directionsService} = useDirectionsService();
    const [routes, setRoutes] = useState([]);
    const [travelModes, setTravelModes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selectedRoute = routes[routeIndex];
    const leg = selectedRoute?.legs[0];

    useEffect(() => {
        // Early exit.
        if (!map || !mapsApi) return;
        setTravelModes([mapsApi.TravelMode.WALKING, mapsApi.TravelMode.DRIVING]);
    }, [map, mapsApi]);

    useEffect(() => {
        // Early exit.
        if (!directionsService || !directionsRenderer || !mapsApi || !travelModes.length) return;
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: travelModes[travelModeIndex],
            provideRouteAlternatives: true
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });
    }, [directionsService, directionsRenderer, mapsApi, origin, destination, travelModes, travelModeIndex]);

    useEffect(() => {
        // Early exit.
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    return leg && (
        <div className={"sms-google-map--directions"}>
            <h2 className={"text-capitalize"}>{selectedRoute.summary}</h2>
            <p>
                {
                    travelModeIndex === 0 ?
                        <span><Icon icon={walkingIconDuoTone}/> {PANES.MAP.WALKING}</span>
                        :
                        <span><Icon icon={carIconDuoTone}/> {PANES.MAP.DRIVING}</span>
                }
            </p>
            <p>{leg.start_address.split(",")[0]} -> {leg.end_address.split(",")[0]}</p>
            <p>{leg.distance?.text} | {leg.duration?.text}</p>
            {
                routes && routes.length > 1 &&
                <>
                    <h3>{PANES.MAP.ALTERNATIVE_ROUTES}</h3>
                    <ul className={"list-unstyled mb-0"}>
                        {
                            routes.map((route, index) => {
                                return (
                                    <li key={route.summary + index}>
                                        <button
                                            className={`btn ${index === routeIndex ? "btn-primary" : "btn-outline-primary"} mb-2`}
                                            onClick={() => setRouteIndex(index)}
                                        >
                                            {route.summary}
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            }
            {/* Display advanced markers */}
            <SMSMapMarker position={origin}/>
            <SMSMapMarker position={destination} isDestination/>
        </div>
    )
}
