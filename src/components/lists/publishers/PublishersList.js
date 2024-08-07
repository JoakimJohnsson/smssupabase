import React from "react";
import {Link} from "react-router-dom";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {ListToolBox} from "../ListToolBox";
import {ROUTES} from "../../../helpers/constants/configConstants";
import {BUCKETS, TABLES} from "../../../helpers/constants/serviceConstants";
import {hasImage, sortByName} from "../../../helpers/functions";
import {ListItemPublishedInfo} from "../ListItemPublishedInfo";


export const PublishersList = ({publishersData, setPublishersData, showAdminInfo, query = ""}) => {

    return publishersData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                publishersData.length ?
                    (publishersData
                            .filter(publisher => publisher.name.toLowerCase()
                                    .includes(query.toLowerCase()) ||
                                query === ""
                            ).sort((a, b) => sortByName(a, b)).map((p, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div className={"d-flex align-items-center"}>
                                            {
                                                hasImage(p) &&
                                                <img src={p.image_url} className={"list-image me-2"} alt={p.name}/>
                                            }
                                            <div>
                                                <Link to={showAdminInfo ? `/admin/publishers/${p.id}` : `/publishers/${p.id}`} className={"me-3"}>
                                                    {p.name}
                                                </Link>
                                                {
                                                    showAdminInfo && <ListItemPublishedInfo dateString={p.created_at}/>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        {
                                            <ListToolBox
                                                item={p}
                                                name={p.name}
                                                displayName={p.name}
                                                data={publishersData}
                                                setData={setPublishersData}
                                                showAdvancedTools={showAdminInfo}
                                                route={ROUTES.ADMIN.PUBLISHERS}
                                                table={TABLES.PUBLISHERS}
                                                imageBucket={BUCKETS.PUBLISHER_IMAGES}
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
