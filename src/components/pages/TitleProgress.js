import React from "react";
import {ProgressBar} from "react-bootstrap";
import {TEXTS} from "../../helpers/constants";


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
                            <ProgressBar striped variant="success" now={titleProgress.progress}/>
                            :
                            <ProgressBar striped now={titleProgress.progress} label={titleProgress.progress > 10 ? collectTextParts : ""}/>

                    }
                </>
            }
        </div>
    )

}
