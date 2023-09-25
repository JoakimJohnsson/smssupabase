import React from "react";
import {Link} from "react-router-dom";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {hasImage, sortByNameAndStartYear} from "../../../../helpers/functions/functions";


export const TitlesPaneTitlesList = ({titlesData}) => {

    return titlesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                titlesData.length ?
                    (titlesData.sort((a, b) => sortByNameAndStartYear(a, b)).map((t, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div className={"d-flex align-items-center"}>
                                            {
                                                hasImage(t) &&
                                                <img src={t.image_url} className={"list-image me-2"} alt={t.name}/>
                                            }
                                            <div>
                                                <Link to={`/titles/${t.id}`} className={"me-3"}>
                                                    {t.name} {t.start_year}
                                                </Link>
                                            </div>
                                        </div>
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
