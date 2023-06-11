import React from "react";
import {CustomSpinner} from "../minis/CustomSpinner";


export const TitleProgress = ({titleProgress}) => {

    return (
        <div className={"pb-2"}>
            {
                !!titleProgress ?
                    <p>Progress! {titleProgress}</p>
                    :
                    <CustomSpinner size={"2x"}/>
            }
        </div>
    )

}
