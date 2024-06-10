import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {ListGroup, ListGroupItem} from "react-bootstrap";


export const DestinationSelector = ({selectedDestinationType, setSelectedDestination, selectedDestination, destinations}) => {
    return (
        <>
            <h3>{selectedDestinationType} {PANES.MAP.NEAREST_DESTINATIONS}</h3>
            <ListGroup action className={"my-3 sms-list-group variant-country"}>
                {
                    destinations.map((destination, index) => {
                        // Do not render more than this
                        if (index > 9) return false;
                        return (
                            <ListGroupItem
                                key={destination.name + index}
                                action
                                onClick={() => setSelectedDestination(destinations[index])}
                                active={selectedDestination === destination}
                            >
                                {destination.name}, {destination.vicinity.split(",")[0]}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </>
    )
}
