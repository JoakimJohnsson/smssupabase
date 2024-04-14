import React from "react";
import {Link} from "react-router-dom";


export const MyTitlesPaneListItemImage = ({title}) => {
    return (
        <div className={"col-12"}>
            <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                  title={title.name}>
                <div className={"image-container position-relative"}>
                    <img
                        src={title.image_url}
                        alt={title.name}
                        className="w-100"
                        loading={"lazy"}
                    />
                </div>
            </Link>
        </div>
    )
}
