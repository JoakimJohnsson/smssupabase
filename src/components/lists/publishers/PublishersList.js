import React from "react";
import {Link} from "react-router-dom";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {ImageIcon, PublishersIcon} from "../../icons";
import {ListToolBox} from "../ListToolBox";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";


export const PublishersList = ({publishersData, setPublishersData, showAdminInfo}) => {

    return publishersData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                publishersData.length ?
                    (publishersData.map((p, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <PublishersIcon size={"1x"} className={"me-2"}/>
                                            {
                                                p && p.image_filename && p.image_url &&
                                                <ImageIcon size={"1x"} className={"me-2"}/>
                                            }
                                            <Link to={showAdminInfo ? `/admin/publishers/${p.id}` : `/publishers/${p.id}`} className={"me-3"}>
                                                {p.name}
                                            </Link>
                                        </div>
                                        <div>
                                            Inlagd: <FriendlyDate dateString={p.created_at}/>
                                        </div>
                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        {
                                            <ListToolBox
                                                item={p}
                                                name={p.name}
                                                data={publishersData}
                                                setData={setPublishersData}
                                                showAdminInfo={showAdminInfo}
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
