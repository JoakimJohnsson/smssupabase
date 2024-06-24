import {useState, useEffect} from "react";


export const useMapsApi = () => {

    const [mapsApi, setMapsApi] = useState(null);
    const [mapTypeControlOptions, setMapTypeControlOptions] = useState({});

    // https://visgl.github.io/react-google-maps/docs/guides/interacting-with-google-maps-api#hooks
    // Initialize mapsAPI
    useEffect(() => {
        // Now you can interact with the imperative maps API.
        // https://developers.google.com/maps/documentation/javascript/reference/map
        setMapsApi(window.google?.maps);
        if (mapsApi) {
            setMapTypeControlOptions({
                style: mapsApi.MapTypeControlStyle.DEFAULT,
                mapTypeIds: [mapsApi.MapTypeId.ROADMAP]
            });
        }

    }, [mapsApi]);

    return {mapsApi, mapTypeControlOptions};
}
