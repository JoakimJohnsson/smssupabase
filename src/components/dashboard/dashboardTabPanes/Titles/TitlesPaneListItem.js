import React from "react";
import {Link} from "react-router-dom";


export const TitlesPaneListItem = ({title}) => {

    return (
        <li key={title.id} className={"title-card"}>
            <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                  title={title.name}>
                <div className={"image-container mb-2 position-relative"}>
                    <img
                        src={title.image_url}
                        alt={title.name}
                        className="w-100"
                        loading={"lazy"}
                    />
                </div>
            </Link>
        </li>
    )
}
