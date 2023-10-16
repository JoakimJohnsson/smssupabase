import React from "react";
import {TEXTS} from "../../helpers/constants";
import CustomProgressBar from "../CustomProgressBar";


export const TitleProgress = ({titleProgress}) => {

    let collectText100 = TEXTS.COLLECTING_TITLE_100;
    let collectTextProgress = TEXTS.COLLECTING_TITLE_TEXT_1 + " " + titleProgress.progress + TEXTS.COLLECTING_TITLE_TEXT_2;
    let collectTextParts = titleProgress.noCollectedIssues + " / " + titleProgress.totalIssues;

    return (
        <div className={"mb-3"}>
            {
                <>
                    <p>
                        {titleProgress.progress === 100 ? collectText100 : collectTextProgress}
                    </p>
                    {
                        titleProgress.progress === 100 ?
                            <CustomProgressBar label={collectTextParts} variant={"success"} valueNow={titleProgress.progress}/>
                            :
                            <CustomProgressBar label={collectTextParts} variant={"primary"} valueNow={titleProgress.progress}/>
                    }
                </>
            }
        </div>
    )

}
