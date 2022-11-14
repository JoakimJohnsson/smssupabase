import React from "react";
import {Link} from "react-router-dom";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {PublishersListAdminToolBox} from "./PublishersListAdminToolBox";
import {PublishersListUserToolBox} from "./PublishersListUserToolBox";
import {PublishersIcon} from "../../icons";


export const PublishersList = ({publishersData, setPublishersData, showAdminInfo}) => {

    return publishersData && (
        <ul className={"sms-list--with-tools"}>
            {
                publishersData.length ?
                    (publishersData.map((p, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <PublishersIcon textVariant={"md"}/>
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
                                            showAdminInfo ?
                                                <PublishersListAdminToolBox
                                                    publisher={p}
                                                    publishersData={publishersData}
                                                    setPublishersData={setPublishersData}
                                                />
                                                :
                                                <PublishersListUserToolBox/>
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
