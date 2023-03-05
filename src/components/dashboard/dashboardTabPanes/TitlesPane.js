import React, {useState, useEffect} from "react";
import {PANES} from "../../../helpers/constants";
import {TitlesList} from "../../lists/titles/TitlesList";
import {useAppContext} from "../../../context/AppContext";
import {getTitlesForUser} from "../../../helpers/functions/serviceFunctions/titleFunctions";
import {CustomSpinner} from "../../minis/CustomSpinner";


export const TitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        getTitlesForUser(user.id, setTitlesData).then(() => setLoading(false));
    }, [user.id])

    return (
        <>
            <h1>{PANES.TITLES.NAME}</h1>
            <p className="lead mb-5">
                {PANES.TITLES.NAME}
            </p>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <div className={"sms-section--light"}>
                        <TitlesList titlesData={titlesData} showAdminInfo={false}/>
                    </div>
            }

        </>
    )
}
