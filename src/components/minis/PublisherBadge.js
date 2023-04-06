import React from "react";


export const PublisherBadge = ({publisher}) => {

    const variants = [0, 200, 400, 600, 800];
    const randomVariant = Math.floor(Math.random() * variants.length);

    return publisher && (
        <span className={`tag-badge bg-publisher-${variants[randomVariant]}`}>{publisher.name}</span>
    )
}
