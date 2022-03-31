import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {supabase} from "../../../supabase/supabaseClient";
import {Spinner} from "../../Spinner";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {DocumentDuplicateIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {toAddTitlesPage} from "../../navigation/navFunctions";

export const TitlesCard = () => {
    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getTitles() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('titles')
                    .select('*')
                if (error && status !== 406) {
                    console.log('Error: ', error);
                }
                if (data) {
                    setTitlesData(data)
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getTitles().then(() => 'Do something')
    }, [])

    const printTitlesData = (td) => {
        return td.map( (t) =>
            <li key={t.id} className={'list-group-item'}>
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
                <h2><DocumentDuplicateIcon className={'sms-icon--text-lg'}/> {LABELS_AND_HEADINGS.TITLES}</h2>
                <p>Det finns för närvarande {titlesData.length} titlar inlagda i databasen.</p>
                <ul className={'list-group list-group-flush small mb-3'}>
                {printTitlesData(titlesData)}
                </ul>
                <button className={'btn btn-primary'} onClick={() => toAddTitlesPage(navigate)}>{LABELS_AND_HEADINGS.ADD_TITLE}</button>
            </div>
        </div>
    )
}
