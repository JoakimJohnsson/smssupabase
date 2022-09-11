import React from "react";
import {Link} from "react-router-dom";
import {FriendlyDate} from "../../miniComponents/FriendlyDate";
import {TitlesListUserToolBox} from "../titles/TitlesListUserToolBox";
import {NoDataAvailable} from "../../miniComponents/NoDataAvailable";
import {PublishersListAdminToolBox} from "./PublishersListAdminToolBox";


export const PublishersList = ({publishersData, setPublishersData, showAdminInfo}) => {

    return publishersData && (
        <ul className={"list-group list-group-flush small mb-3 list-unstyled"}>
            {
                publishersData.length ?
                    (publishersData.map((p, index) =>
                            <li key={index} className={"list-group-item ps-0"}>
                                <div className={"row"}>
                                    <div className={"col-8"}>
                                        <Link to={showAdminInfo ? `/admin/publishers/${p.id}` : `/publishers/${p.id}`} className={"me-2"}>
                                            {p.name}
                                        </Link>
                                        Inlagd: <FriendlyDate dateString={p.created_at}/>
                                    </div>
                                    <div className={"col-4"}>
                                        {showAdminInfo ? <PublishersListAdminToolBox id={p.id} name={p.name} image={p.image_filename}
                                                                                     publishersData={publishersData}
                                                                                     setPublishersData={setPublishersData}/> :
                                            <TitlesListUserToolBox/>}
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
