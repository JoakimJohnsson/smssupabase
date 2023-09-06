import React from "react";
import {Link} from "react-router-dom";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {hasImage, sortByNameAndStartYear} from "../../../helpers/functions/functions";
import {ListItemPublishedInfo} from "../ListItemPublishedInfo";


export const TitlesList = ({titlesData, setTitlesData, showToolbox = false, showAdminInfo = false, showCreatedInfo = false, query = ""}) => {

    return titlesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                titlesData.length ?
                    (titlesData
                            .filter(title => title.name.toLowerCase()
                                    .includes(query.toLowerCase()) ||
                                title.start_year.toString().toLowerCase()
                                    .includes(query.toLowerCase()) ||
                                query === ""
                            )
                            .sort((a, b) => sortByNameAndStartYear(a, b)).map((t, index) =>
                                <li key={index} className={"list-group-item px-0"}>
                                    <div className={"row"}>
                                        <div className={"sms-list-col--main"}>
                                            <div className={"d-flex align-items-center"}>
                                                {
                                                    hasImage(t) &&
                                                    <img src={t.image_url} className={"list-image me-2"} alt={t.name}/>
                                                }
                                                <div>
                                                    <Link to={showAdminInfo ? `/admin/titles/${t.id}` : `/titles/${t.id}`} className={"me-3"}>
                                                        {t.name} {t.start_year}
                                                    </Link>
                                                    {
                                                        (showAdminInfo || showCreatedInfo) && <ListItemPublishedInfo dateString={t.created_at}/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"sms-list-col--tools"}>
                                            {showToolbox &&
                                                <ListToolBox
                                                    item={t}
                                                    name={t.name}
                                                    displayName={t.name + " " + t.start_year}
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
