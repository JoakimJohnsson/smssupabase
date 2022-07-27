import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../miniComponents/TextSpacer";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TitlesListAdminToolBox} from "./TitlesListAdminToolBox";
import {TitlesListUserToolBox} from "./TitlesListUserToolBox";
import {NoDataAvailable} from "../../miniComponents/NoDataAvailable";


export const TitlesList = ({titlesData, setTitlesData, showAdminInfo}) => {

    return titlesData && (
        <ul className={"list-group list-group-flush small mb-3 list-unstyled"}>
            {
                titlesData.length ?
                    (titlesData.map((t, index) =>
                            <li key={index} className={'list-group-item ps-0'}>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <Link to={showAdminInfo ? `/admin/titles/${t.id}` : `/titles/${t.id}`} className={'me-2'}>
                                            {t.name}
                                        </Link>
                                        {t.start_year}
                                        <TextSpacer character={'|'} margin={'mx-2'}/>
                                        Inlagd: <FriendlyDate dateString={t.created_at}/>
                                    </div>
                                    <div className={"col-4"}>
                                        {showAdminInfo ? <TitlesListAdminToolBox id={t.id} name={t.name} image={t.title_image_filename} titlesData={titlesData} setTitlesData={setTitlesData} /> : <TitlesListUserToolBox/>}
                                    </div>
                                </div>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
