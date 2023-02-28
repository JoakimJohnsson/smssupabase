import React from "react";
import {Link} from "react-router-dom";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {ImageIcon, TitleIcon} from "../../icons";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {hasImage, sortByName} from "../../../helpers/functions/functions";


export const TitlesList = ({titlesData, setTitlesData, showAdminInfo}) => {

    return titlesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                titlesData.length ?
                    (titlesData.sort((a, b) => sortByName(a, b)).map((t, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <TitleIcon size={"1x"} className={"me-2"}/>
                                            {
                                                hasImage(t) && showAdminInfo &&
                                                <ImageIcon size={"1x"} className={"me-2 text-success"}/>
                                            }
                                            <Link to={showAdminInfo ? `/admin/titles/${t.id}` : `/titles/${t.id}`} className={"me-3"}>
                                                {t.name} {t.start_year}
                                            </Link>
                                        </div>
                                        <div>
                                            Inlagd: <FriendlyDate dateString={t.created_at}/>
                                        </div>
                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        {
                                            <ListToolBox
                                                item={t}
                                                name={t.name}
                                                displayName={t.name + " " + t.start_year + "."}
                                                data={titlesData}
                                                setData={setTitlesData}
                                                showAdminInfo={showAdminInfo}
                                                route={ROUTES.ADMIN.TITLES}
                                                table={TABLES.TITLES}
                                                imageBucket={BUCKETS.TITLE_IMAGES}
                                                isTitle
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
