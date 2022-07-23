import React, {useEffect, useState} from "react";
import {getRowsByTable} from "../../serviceFunctions";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {Spinner} from "../../Spinner";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRowsByTable(setLoading, "titles", setTitlesData).then(r => console.info('Got titles'))
    }, [])

    // TODO use Titleslist compåonent
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

    // TODO Filtrera - sök - sortering
    // TODO Lista länk till titleEditPage

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    {loading ? <Spinner/> : printTitlesData(titlesData)}
                </div>
            </div>
        </main>
    )
}
