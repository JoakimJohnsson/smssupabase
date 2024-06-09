import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";


export const DestinationSelector = ({selectedDestinationType, setSelectedDestination, destinations}) => {
    return (
        <>
            <h2>{PANES.MAP.NEAREST_DESTINATIONS} {selectedDestinationType}</h2>
            <ul>
                {
                    destinations.map((destination, index) => {
                        // Do not render more than this
                        if (index > 5) return false;
                        console.log("destination", destination);
                        return (
                            <li>
                                {destination.name}, {destination.vicinity.split(",")[0]}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}
