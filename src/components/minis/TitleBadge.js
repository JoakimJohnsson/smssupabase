import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {LinkIcon} from "../icons";


export const TitleBadge = ({title}) => {

    const variants = [0, 200, 400, 600, 800];
    const [randomVariant, setRandomVariant] = useState(null);

    useEffect(() => {
        const rand = Math.floor(Math.random() * variants.length);
        setRandomVariant(rand)
    }, [variants.length, title])

    return title && (
        <Link to={`/titles/${title.id}`} title={title.name}><span className={`tag-badge text-black bg-title-${variants[randomVariant]}`}><LinkIcon/> {title.name}</span></Link>
    )
}
