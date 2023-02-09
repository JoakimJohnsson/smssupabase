import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../minis/TextSpacer";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {TitlesIcon} from "../../icons";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";


export const TitlesList = ({titlesData, setTitlesData, showAdminInfo}) => {

    return titlesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                titlesData.length ?
                    (titlesData.map((t, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <TitlesIcon size={"1x"} className={"me-2"}/>
                                            <Link to={showAdminInfo ? `/admin/titles/${t.id}` : `/titles/${t.id}`} className={"me-3"}>
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
                                            <ListToolBox
                                                item={t}
                                                name={t.name}
                                                data={titlesData}
                                                setData={setTitlesData}
                                                showAdminInfo={showAdminInfo}
                                                route={ROUTES.ADMIN.TITLES}
                                                table={TABLES.TITLES}
                                                imageBucket={BUCKETS.TITLE_IMAGES}
                                            />
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
