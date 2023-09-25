import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../helpers/functions/serviceFunctions/titleFunctions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {TitlesPaneTitlesList} from "./TitlesPaneTitlesList";


export const TitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        getTitlesForUser(user.id, setTitlesData).then(() => setLoading(false));
    }, [user.id])

    return (
        <>
            <h1 className={"mb-5"}>{PANES.TITLES.NAME}</h1>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <div className={"sms-section--light"}>
                        <TitlesPaneTitlesList titlesData={titlesData}/>
                    </div>
            }
        </>
    )
}
