import React, {useMemo} from "react";
import {PANES} from "../../../../../../helpers/constants/textConstants/texts";
import {ListGroup, ListGroupItem} from "react-bootstrap";


export const DestinationSelector = ({selectedDestinationType, setSelectedDestination, selectedDestination, destinations}) => {

    /*
    To address the performance issue with the map function being called on every render, we can memoize the
    list items using useMemo. This will ensure that the list items are only recalculated when the dependencies
    change (in this case, when the destinations array changes).
    */

    const renderedDestinations = useMemo(() => {
        return destinations.slice(0, 10).map((destination, index) => (
            <ListGroupItem
                key={destination.name + index}
                action="true"
                onClick={() => setSelectedDestination(destinations[index])}
                active={selectedDestination === destination}
            >
                <p className={"m-0 text-label"}>{destination.name}</p>
                <p className={"m-0 small"}>{destination.vicinity}</p>
            </ListGroupItem>
        ));
    }, [destinations, selectedDestination, setSelectedDestination]);

    return (
        <>
            <h3>{selectedDestinationType} {PANES.MAP.NEAREST_DESTINATIONS}</h3>
            <ListGroup action="true" className={"my-3 sms-list-group variant-country"}>
                {renderedDestinations}
            </ListGroup>
        </>
    )
}
