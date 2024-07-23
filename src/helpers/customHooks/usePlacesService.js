import {useState, useEffect} from "react";
import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";


export const usePlacesService = () => {

    const placesLibrary = useMapsLibrary("places");
    const map = useMap();
    const [placesService, setPlacesService] = useState(null);

    useEffect(() => {
        if (!map || !placesLibrary) return;
        setPlacesService(new placesLibrary.PlacesService(map));
    }, [map, placesLibrary]);

    return {placesService};
}
