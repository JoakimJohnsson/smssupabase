import React from "react";


export const MyTitlesPaneListItemTitle = ({title}) => {
    return (
        <div className={"col-12"}>
            <div className={"p-3 bg-primary"}>
                <h2 className={"m-0 text-dark"}>{title.name}</h2>
            </div>
        </div>
    )
}
