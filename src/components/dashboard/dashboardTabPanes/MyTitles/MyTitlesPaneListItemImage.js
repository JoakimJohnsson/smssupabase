import React from "react";


export const MyTitlesPaneListItemImage = ({title}) => {
    return (
        <div className={"col-12"}>
            <div className={"image-container position-relative border-end border-start border-primary"}>
                <img
                    src={title.image_url}
                    alt={""}
                    className="w-100"
                    loading={"lazy"}
                    aria-hidden={true}
                />
            </div>
        </div>
    )
}
