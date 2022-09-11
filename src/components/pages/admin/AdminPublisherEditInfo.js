import React from "react";
import {LogMe} from "../../miniComponents/LogMe";


export const AdminPublisherEditInfo = ({publisher}) => {

    return (
        <>
            <p>image filename: {publisher.image_filename}</p>
            <p>image url: {publisher.image_url}</p>

            <LogMe logThis={publisher}/>
            <p>Edit publisher info here</p>
        </>
    )
}
