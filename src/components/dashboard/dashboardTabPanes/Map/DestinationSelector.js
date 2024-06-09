import React from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {ListGroup, ListGroupItem} from "react-bootstrap";


export const DestinationSelector = ({selectedDestinationType, setSelectedDestination, destinations}) => {
    return (
        <>
            <h3>{selectedDestinationType} {PANES.MAP.NEAREST_DESTINATIONS}</h3>
            <ListGroup className={"my-3"}>
                {
                    destinations.map((destination, index) => {
                        // Do not render more than this
                        if (index > 5) return false;
                        return (
                            <ListGroupItem action onClick={() => setSelectedDestination(destinations[index])}>
                                {destination.name}, {destination.vicinity.split(",")[0]}
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup>
        </>
    )
}
