import React from "react";


export const TitleProgress = ({titleProgress}) => {

    return (
        <div className={"pb-2"}>
            {
                <p>Progress! {titleProgress || 0}</p>
            }
        </div>
    )

}
