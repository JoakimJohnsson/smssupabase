import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TitlesListAdminToolBox} from "./TitlesListAdminToolBox";
import {TitlesListUserToolBox} from "./TitlesListUserToolBox";


export const TitlesList = ({titlesData, showAdminToolBox, showUserToolBox}) => {

    return (
        <ul className={"list-group list-group-flush small mb-3"}>
            {
                titlesData.map((t, index) =>
                    <li key={index} className={'list-group-item ps-0'}>
                        <Link to={`/admin/titles/${t.id}`} className={'me-2'}>
                            {t.name}
                        </Link>
                        {t.start_year}
                        <TextSpacer character={'|'} margin={'mx-2'}/>
                        Inlagd: <FriendlyDate dateString={t.created_at}/>
                        {showAdminToolBox && <TitlesListAdminToolBox/>}
                        {showUserToolBox && <TitlesListUserToolBox/>}
                    </li>)
            }
        </ul>
    )
}
