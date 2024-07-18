import {useMemo} from "react";
import {useMapsLibrary} from "@vis.gl/react-google-maps";


export const useGeocoder = () => {
    const geocodingLibrary = useMapsLibrary("geocoding");
    const geocoder = useMemo(
        () => geocodingLibrary && new geocodingLibrary.Geocoder(),
        [geocodingLibrary],
    );
    return {geocoder};
}
