import React, {useEffect, useState} from "react";
import {Spinner} from "../../../minis/Spinner";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../serviceFunctions";
import {PlusButton} from "../../../minis/PlusButton";
import {useNavigate} from "react-router-dom";
import {TitlesIcon} from "../../../icons";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";


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
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}><TitlesIcon textVariant={"xl"}/><span>{LABELS_AND_HEADINGS.ALL_TITLES}</span></h1>
                        <Breadcrumbs/>
                        {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true}/> : <Spinner/>}
                        <PlusButton onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)} label={LABELS_AND_HEADINGS.ADD_TITLE}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
