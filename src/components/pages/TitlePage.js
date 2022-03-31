import React from "react";
import {useParams} from "react-router-dom";

export const TitlePage = () => {

    const {id} = useParams();

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>Title {id}</h1>
                </div>
            </div>
        </main>
    )
}
