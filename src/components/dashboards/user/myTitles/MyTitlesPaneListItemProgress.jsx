import React from "react";
import CustomProgressBar from "../../../CustomProgressBar";


export const MyTitlesPaneListItemProgress = ({titleProgress, collectTextParts}) => {
    return !!titleProgress.progress && (
        <div className={"col-12 border-end border-start border-primary"}>
            {
                titleProgress.progress === 100 ?
                    <CustomProgressBar rounded={false} label={collectTextParts} variant={"success"} valueNow={titleProgress.progress}/>
                    :
                    <CustomProgressBar rounded={false} label={collectTextParts} variant={"primary"} valueNow={titleProgress.progress}/>
            }
        </div>
    )
}
