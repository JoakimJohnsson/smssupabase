import React, {useEffect, useState} from "react";
import {Spinner} from "../../../minis/Spinner";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../serviceFunctions";
import {AdminH1} from "../../../headings";
import {PlusButton} from "../../../minis/PlusButton";
import {useNavigate} from "react-router-dom";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true}/> : <Spinner/>}
                    <PlusButton onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)} customClass={"me-3 mb-2"} label={LABELS_AND_HEADINGS.ADD_TITLE}/>
                </div>
            </div>
        </main>
    )
}
