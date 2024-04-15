import React from "react";


export const RouteLoadingIndicator = ({text = "Default"}) => {
    console.log("Loading route! ", text);
    return (
        <div>
            <p>Loading...</p>
            <p>{text}</p>
        </div>
    );
};
