import React, {useEffect, useRef, useState} from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";
import {useUserPosition} from "../../../../../helpers/customHooks/useUserPosition";
import {useMapsApi} from "../../../../../helpers/customHooks/useMapsApi";
import {useMapsLibrary} from "@vis.gl/react-google-maps";


export const LocationSelector = ({setLocation}) => {

    const {locationAllowedAndSupported} = useUserPosition();
    const placesLibrary = useMapsLibrary("places");
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const {mapsApi} = useMapsApi();

    useEffect(() => {
        if (!placesLibrary || !inputRef.current) return;
        const options = {
            fields: ['geometry', 'name', 'formatted_address', 'address_components']
        };
        const autocomplete = new placesLibrary.Autocomplete(inputRef.current, options);
        setPlaceAutocomplete(autocomplete);
    }, [placesLibrary]);

    useEffect(() => {
        if (!mapsApi || !mapsApi.event || !placeAutocomplete) return;
        const handlePlaceChange = () => {
            const location = placeAutocomplete.getPlace();
            setLocation(location);
        };
        placeAutocomplete.addListener('place_changed', handlePlaceChange);
        return () => {
            mapsApi.event.clearInstanceListeners(placeAutocomplete);
        };
    }, [mapsApi, placeAutocomplete, setLocation]);

    return (
        <div className="mb-4">
            <h3>{locationAllowedAndSupported ? PANES.MAP.CHOSE_OTHER_LOCATION : PANES.MAP.CHOSE_LOCATION}</h3>
            <div className={"col-12 col-sm-6 col-lg-4"}>
                <input ref={inputRef} className="form-control"/>
            </div>
        </div>
    )
}
