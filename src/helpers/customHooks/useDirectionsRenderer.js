import {useState, useEffect} from "react";
import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import {COLOR_VARIABLE_NAMES} from "../constants/configConstants";


export const useDirectionsRenderer = () => {

    const routesLibrary = useMapsLibrary("routes");
    const map = useMap();
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        // https://primefaces.github.io/primefaces/jsdocs/interfaces/node_modules__types_google_maps.google.maps.PolylineOptions.html
        const polylineOptions = {
            strokeColor: COLOR_VARIABLE_NAMES.COUNTRY,
            strokeOpacity: 0.4,
            strokeWeight: 5
        };
        if (!map || !routesLibrary || !polylineOptions) return;
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer(
            {
                map: map,
                polylineOptions: polylineOptions,
                suppressMarkers: true // Removes direction markers
            }
        ));
    }, [map, routesLibrary]);

    return {directionsRenderer};
}
