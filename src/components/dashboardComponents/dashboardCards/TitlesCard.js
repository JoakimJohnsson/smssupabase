import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../helpers/constants";
import {Spinner} from "../../Spinner";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {toAddTitlesPage} from "../../navigation/navFunctions";
import {getRowsByTableWithLimitAndOrderByColumn, getRowCountOfTable} from "../../serviceFunctions";

export const TitlesCard = () => {
    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [totalTitlesCount, setTotalTitlesCount] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(setLoading, 'titles', 'created_at', setTitlesData, 5, false)
            .then(() => {
                getRowCountOfTable(setLoading, 'titles', setTotalTitlesCount).then(() => 'Do something')
            })
    }, [])

    const printTitlesData = (td) => {
        return td.map( (t, index) =>
            <li key={index} className={'list-group-item'}>
                <Link to={`/admin/titles/${t.id}`} className={'me-2'}>
                    {t.name}
                </Link>
                {t.start_year}
                <TextSpacer character={'|'} margin={'mx-2'}/>
                Inlagd: <FriendlyDate dateString={t.created_at}/>
            </li>)
    }

    return loading ? (<Spinner/>) : (
        <div className={'col-12 col-md-6 col-xl-4'}>
            <div className={'dashboard-card'}>
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg me-2'}/>{LABELS_AND_HEADINGS.TITLES}</h2>
                <p>Visar de {titlesData.length} senast inlagda titlarna från databasen. Det finns för närvarande {totalTitlesCount} titlar totalt.</p>
                <ul className={'list-group list-group-flush small mb-3'}>
                {printTitlesData(titlesData)}
                </ul>
                <button className={'btn btn-primary me-3 mb-2'} onClick={() => toAddTitlesPage(navigate)}>{LABELS_AND_HEADINGS.ADD_TITLE}</button>
                <Link className={'btn btn-outline-secondary mb-2'} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.EDIT_ALL_TITLES}</Link>
            </div>
        </div>
    )
}
