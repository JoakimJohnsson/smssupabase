import React from "react";
import {HeadingWithBreadCrumbs} from "../headings";


export const Title = () => {

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 row-padding--main"}>
                    <HeadingWithBreadCrumbs text={"A title"}/>
                </div>
            </div>
        </main>
    )
}
