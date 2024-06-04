import React, {useEffect, useState} from "react";
import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {COLOR_VARIABLE_NAMES} from "../../../../helpers/constants/configConstants";


export const Directions = ({mapsApi, fromPosition, toPosition}) => {

    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    // Use null as default to avoid runtime errors.
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selectedRoute = routes[routeIndex];
    const leg = selectedRoute?.legs[0];

    // Initialize services and renderer
    useEffect(() => {
        const polylineOptions = {
            strokeColor: COLOR_VARIABLE_NAMES.COUNTRY,
            strokeOpacity: 1,
            strokeWeight: 5
        };
        // Early exit.
        if (!routesLibrary || !map || !polylineOptions) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map, polylineOptions}));
    }, [routesLibrary, map]);

    useEffect(() => {
        // Early exit.
        if (!directionsService || !directionsRenderer || !mapsApi) return;

        directionsService.route({
            origin: fromPosition,
            destination: toPosition,
            travelMode: mapsApi.TravelMode.WALKING,
            provideRouteAlternatives: true
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });
    }, [directionsService, directionsRenderer, mapsApi, fromPosition, toPosition]);

    useEffect(() => {
        // Early exit.
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    return leg && (
        <div className={"sms-google-map--directions"}>
            <h2>{selectedRoute.summary}</h2>
            <p>{leg.start_address.split(",")[0]} -> {leg.end_address.split(",")[0]}</p>
            <p>{leg.distance?.text} | {leg.duration?.text}</p>
            <h2>Alternativa vägar</h2>
            <ul className={"list-unstyled"}>
                {
                    routes.map((route, index) => {
                        return (
                            <li key={route.summary}>
                                <button
                                    className={`btn ${index === routeIndex ? "btn-primary" : "btn-outline-primary"} mb-2`}
                                    onClick={() => setRouteIndex(index)}
                                >{route.summary}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
