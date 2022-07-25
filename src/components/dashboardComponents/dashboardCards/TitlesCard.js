import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../helpers/constants";
import {Spinner} from "../../Spinner";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {toAddTitlesPage} from "../../navigation/navFunctions";
import {getRowsByTableWithLimitAndOrderByColumn, getRowCountOfTable} from "../../serviceFunctions";
import {TitlesList} from "../../listComponents/titles/TitlesList";

export const TitlesCard = () => {
    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const [totalTitlesCount, setTotalTitlesCount] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn('titles', 'created_at', setLimitedTitlesData, 5, false)
            .then(() => {
                getRowCountOfTable('titles', setTotalTitlesCount).then(() => 'Do something')
            })
    }, [])

    return (
        <div className={'sms-dashboard-col'}>
            <div className={'dashboard-card'}>
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.TITLES}</h2>
                {
                    limitedTitlesData && totalTitlesCount ?
                        <>
                            <p>
                                Visar de {limitedTitlesData.length} senast inlagda titlarna från databasen. Det finns för
                                närvarande {totalTitlesCount} titlar totalt.
                            </p>
                            <TitlesList titlesData={limitedTitlesData} showAdminInfo={true}/>
                            <button className={'btn btn-primary me-3 mb-2'}
                                    onClick={() => toAddTitlesPage(navigate)}>{LABELS_AND_HEADINGS.ADD_TITLE}
                            </button>
                            <Link className={'btn btn-outline-secondary mb-2'} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.SEE_ALL_TITLES}</Link>
                        </>
                        :
                        <Spinner/>
                }
            </div>
        </div>
    )
}
