import {useState, useEffect} from "react";
import {useMapsLibrary} from "@vis.gl/react-google-maps";


export const useDirectionsService = () => {

    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState(null);

    useEffect(() => {
        if (!routesLibrary) return;
        setDirectionsService(new routesLibrary.DirectionsService());
    }, [routesLibrary]);

    return {directionsService};
}
