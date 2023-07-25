import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {LinkIcon} from "../icons";


export const PublisherBadge = ({publisher}) => {

    const variants = [0, 200, 400, 600, 800];
    const [randomVariant, setRandomVariant] = useState(null);

    useEffect(() => {
        const rand = Math.floor(Math.random() * variants.length);
        setRandomVariant(rand)
    }, [variants.length, publisher])

    return publisher && (
        <Link className={"hocus-standard"} to={`/publishers/${publisher.id}`} title={publisher.name}><span className={`tag-badge bg-publisher-${variants[randomVariant]}`}><LinkIcon/> {publisher.name}</span></Link>
    )
}
