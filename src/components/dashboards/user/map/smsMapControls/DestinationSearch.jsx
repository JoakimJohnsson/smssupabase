import React from "react";
import {PANES} from "../../../../../helpers/constants/textConstants/texts";
import {usePlacesService} from "../../../../../helpers/customHooks/usePlacesService";
import {MAP_CONFIG} from "../../../../../helpers/constants/configConstants";
import {IconButton} from "../../../../minis/IconButton";
import {faDeleteLeft, faStore, faPhoneRotary, faCartShopping} from "@fortawesome/pro-solid-svg-icons";
import {faStore as faStoreReg, faPhoneRotary as faPhoneRotaryReg, faCartShopping as faCartShoppingReg} from "@fortawesome/pro-regular-svg-icons";
import {useMapsApi} from "../../../../../helpers/customHooks/useMapsApi";
import {LABELS} from "../../../../../helpers/constants/textConstants/labelsAndHeadings";


export const DestinationSearch = ({position, setDestinations, setSelectedDestinationType, selectedDestinationType}) => {

    const {placesService} = usePlacesService();
    const {mapsApi} = useMapsApi();

    const handlePlacesSearch = (request) => {
        if (!placesService || !mapsApi) return;
        placesService.nearbySearch(
            {
                location: position,
                language: "sv",
                keyword: request.query,
                rankBy: mapsApi.places.RankBy.DISTANCE
            }
            , (results, status) => {
                if (status === window.google?.maps.places.PlacesServiceStatus.OK && results) {
                    setDestinations(results);
                    setSelectedDestinationType(request.name);
                } else {
                    console.error("PlacesService failed with status:", status);
                }
            });
    }

    const handleReset = () => {
        setDestinations(null);
        setSelectedDestinationType(null);
    }

    return (
        <>
            <h2>{PANES.MAP.SEARCH_FOR_NEAREST}</h2>
            <div className={"my-3"}>

                <IconButton
                    variant={`${selectedDestinationType === MAP_CONFIG.REQUESTS.FLEA_MARKET.name ? "country" : "outline-country"}`}
                    label={PANES.MAP.FLEA_MARKETS}
                    icon={selectedDestinationType === MAP_CONFIG.REQUESTS.FLEA_MARKET.name ? faStore : faStoreReg}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.FLEA_MARKET)}
                />

                <IconButton
                    variant={`${selectedDestinationType === MAP_CONFIG.REQUESTS.SECOND_HAND.name ? "country" : "outline-country"}`}
                    label={PANES.MAP.SECOND_HAND_SHOPS}
                    icon={selectedDestinationType === MAP_CONFIG.REQUESTS.SECOND_HAND.name ? faPhoneRotary : faPhoneRotaryReg}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.SECOND_HAND)}
                />

                <IconButton
                    variant={`${selectedDestinationType === MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE.name ? "country" : "outline-country"}`}
                    label={PANES.MAP.COMIC_BOOK_STORES}
                    icon={selectedDestinationType === MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE.name ? faCartShopping : faCartShoppingReg}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE)}
                />

                {
                    selectedDestinationType &&
                    <IconButton
                        variant={"outline-country"}
                        label={LABELS.COMMON.RESET}
                        icon={faDeleteLeft}
                        onClick={handleReset}
                    />
                }
            </div>
        </>
    )
}
