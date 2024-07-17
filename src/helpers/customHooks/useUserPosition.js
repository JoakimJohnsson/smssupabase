import {useState, useEffect} from "react";
import {CONFIG} from "../constants/configConstants";
import {useAppContext} from "../../context/AppContext";
import {useGeocoder} from "./useGeocoder";
import {getLocationFromPosition} from "../functions";


export const useUserPosition = () => {

    const {profile} = useAppContext();
    const {geocoder} = useGeocoder();
    const [positionPending, setPositionPending] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [locationAllowedAndSupported, setLocationAllowedAndSupported] = useState(false);

    useEffect(() => {
        const checkGeolocationSupport = () => {
            if ("geolocation" in navigator && profile?.allow_location_access) {
                setLocationAllowedAndSupported(true);
            } else {
                setLocationAllowedAndSupported(false);
            }
        };
        checkGeolocationSupport();
    }, [profile]);

    // Getting user position
    useEffect(() => {
        const fetchUserPosition = () => {
            if (!locationAllowedAndSupported) {
                console.log("Geolocation is not supported by this browser or access is not allowed.");
                setPositionPending(false);
                return;
            }

            const success = async (position) => {
                const userPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                try {
                    const result = await getLocationFromPosition(geocoder, userPos);
                    setUserLocation(result);
                } catch (error) {
                    console.error('Error fetching user location: ', error);
                }
                setPositionPending(false);
            };

            const error = (error) => {
                console.error('Error occurred while getting location: ', error.message);
                setPositionPending(false);
            };

            const options = {
                timeout: CONFIG.TIMEOUT_MEGA_XXL,
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
        };

        setPositionPending(true);
        fetchUserPosition();
    }, [geocoder, locationAllowedAndSupported]);

    return {positionPending, userLocation, locationAllowedAndSupported, geocoder};
}
