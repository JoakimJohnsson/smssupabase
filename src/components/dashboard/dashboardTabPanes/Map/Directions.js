import React, {useEffect, useState} from "react";
import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {COLOR_VARIABLE_NAMES} from "../../../../helpers/constants/configConstants";


export const Directions = ({mapsApi, origin, destination}) => {

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
        // https://primefaces.github.io/primefaces/jsdocs/interfaces/node_modules__types_google_maps.google.maps.PolylineOptions.html
        const polylineOptions = {
            strokeColor: COLOR_VARIABLE_NAMES.COUNTRY,
            strokeOpacity: 0.5,
            strokeWeight: 5
        };

        // TODO - Fix custom market??!?
        // https://primefaces.github.io/primefaces/jsdocs/interfaces/node_modules__types_google_maps.google.maps.MarkerOptions.html
        // const markerOptions = {};

        // Early exit.
        if (!routesLibrary || !map || !polylineOptions) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer(
            {
                map: map,
                polylineOptions: polylineOptions,
                suppressMarkers: true // Removes direction markers
            }
        ));
    }, [routesLibrary, map]);

    useEffect(() => {
        // Early exit.
        if (!directionsService || !directionsRenderer || !mapsApi) return;

        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: mapsApi.TravelMode.WALKING,
            provideRouteAlternatives: true
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });
    }, [directionsService, directionsRenderer, mapsApi, origin, destination]);

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
            <h3>Alternativa vägar</h3>
            <ul className={"list-unstyled mb-0"}>
                {
                    routes.map((route, index) => {
                        return (
                            <li key={route.summary}>
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
        </div>
    )
}
