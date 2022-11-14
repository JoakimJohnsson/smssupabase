import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../minis/TextSpacer";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {TitlesListAdminToolBox} from "./TitlesListAdminToolBox";
import {TitlesListUserToolBox} from "./TitlesListUserToolBox";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {TitlesIcon} from "../../icons";


export const TitlesList = ({titlesData, setTitlesData, showAdminInfo}) => {

    return titlesData && (
        <ul className={"sms-list--with-tools"}>
            {
                titlesData.length ?
                    (titlesData.map((t, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <TitlesIcon textVariant={"md"}/>
                                            <Link to={showAdminInfo ? `/admin/titles/${t.id}` : `/titles/${t.id}`} className={"me-2"}>
                                                {t.name}
                                            </Link>
                                        </div>
                                        <div>
                                            {t.start_year}
                                            <TextSpacer character={"|"} margin={"mx-2"}/>
                                            Inlagd: <FriendlyDate dateString={t.created_at}/>
                                        </div>
                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        {
                                            showAdminInfo ?
                                                <TitlesListAdminToolBox
                                                    title={t}
                                                    titlesData={titlesData}
                                                    setTitlesData={setTitlesData}
                                                />
                                                :
                                                <TitlesListUserToolBox/>
                                        }
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
