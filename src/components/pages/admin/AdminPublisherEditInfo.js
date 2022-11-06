import React from "react";


export const AdminPublisherEditInfo = ({publisher}) => {

    return (
        <div className={"sms-dashboard-col"}>
            <p>image filename: {publisher.image_filename}</p>
            <p>image url: {publisher.image_url}</p>
        </div>
    )
}
