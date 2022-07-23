import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TitlesListToolBox} from "./TitlesListToolBox";


export const TitlesList = ({titlesData, addToolBox}) => {

    return (
        <ul className={"list-group list-group-flush small mb-3"}>
            {
                titlesData.map((t, index) =>
                    <li key={index} className={'list-group-item'}>
                        <Link to={`/admin/titles/${t.id}`} className={'me-2'}>
                            {t.name}
                        </Link>
                        {t.start_year}
                        <TextSpacer character={'|'} margin={'mx-2'}/>
                        Inlagd: <FriendlyDate dateString={t.created_at}/>
                        {addToolBox && <TitlesListToolBox/>}
                    </li>)
            }
        </ul>
    )
}
