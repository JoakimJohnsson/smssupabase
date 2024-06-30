import React from "react";
import {PANES} from "../../../../../../helpers/constants/textConstants/texts";
import {usePlacesService} from "../../../../../../helpers/customHooks/usePlacesService";
import {LABELS_AND_HEADINGS, MAP_CONFIG} from "../../../../../../helpers/constants/configConstants";
import {IconButton} from "../../../../../minis/IconButton";
import {faDeleteLeft} from "@fortawesome/pro-solid-svg-icons";


export const DestinationSearch = ({userPosition, mapsApi, setDestinations, setSelectedDestinationType, selectedDestinationType}) => {

    const {placesService} = usePlacesService();

    const handlePlacesSearch = (request) => {
        if (!placesService) return;
        placesService.nearbySearch(
            {
                location: userPosition,
                language: "sv",
                keyword: request.query,
                rankBy: mapsApi.places.RankBy.DISTANCE
            }
            , (results, status) => {
                if (status === "OK" && results) {
                    setDestinations(results);
                    setSelectedDestinationType(request.name);
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
                <button
                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.FLEA_MARKET.name ? "btn-country" : "btn-outline-country"}`}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.FLEA_MARKET)}
                >
                    {PANES.MAP.FLEA_MARKETS}
                </button>
                <button
                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.SECOND_HAND.name ? "btn-country" : "btn-outline-country"}`}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.SECOND_HAND)}
                >
                    {PANES.MAP.SECOND_HAND_SHOPS}
                </button>
                <button
                    className={`sms-btn btn ${selectedDestinationType === MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE.name ? "btn-country" : "btn-outline-country"}`}
                    onClick={() => handlePlacesSearch(MAP_CONFIG.REQUESTS.COMIC_BOOK_STORE)}
                >
                    {PANES.MAP.COMIC_BOOK_STORES}
                </button>
                {
                    selectedDestinationType &&
                    <IconButton
                        variant={"outline-country"}
                        label={LABELS_AND_HEADINGS.RESET}
                        icon={faDeleteLeft}
                        onClick={handleReset}
                    />
                }
            </div>
        </>
    )
}
