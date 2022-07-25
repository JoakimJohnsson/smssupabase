import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../Spinner";
import {TitlesList} from "../listComponents/titles/TitlesList";
import {useAppContext} from "../../context/AppContext";


export const Titles = () => {

    const {titlesData} = useAppContext();

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    {
                        titlesData ?
                            <TitlesList titlesData={titlesData} showAdminInfo={false}/>
                            :
                            <Spinner/>
                    }
                </div>
            </div>
        </main>
    )
}
