import React from "react";

export const FriendlyDate = ({dateString}) => {
    const friendlyDate = new Date(dateString).toLocaleDateString();
    return (
        <span>{friendlyDate}</span>
    )
}
