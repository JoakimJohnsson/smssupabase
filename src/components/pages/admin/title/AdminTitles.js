import React, {useEffect, useState} from "react";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                        <Breadcrumbs/>
                        {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true}/> : <CustomSpinner/>}
                        <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)}
                                    label={LABELS_AND_HEADINGS.ADD_TITLE}/>
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
