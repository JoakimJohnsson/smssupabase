import {useState, useEffect} from "react";
import {useMapsLibrary} from "@vis.gl/react-google-maps";


export const useGeocoder = () => {

    const geocodingLibrary = useMapsLibrary("geocoding");
    const [geocoder, setGeocoder] = useState(null);

    useEffect(() => {
        if (!geocodingLibrary) return;
        setGeocoder(new geocodingLibrary.Geocoder());
    }, [geocodingLibrary]);

    return {geocoder};
}
