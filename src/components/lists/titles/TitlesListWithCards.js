import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {sortByName} from "../../../helpers/functions/functions";
import {TitleTool} from "../TitleTool";
import {Link} from "react-router-dom";


export const TitlesListWithCards = ({titlesData}) => {

    return titlesData && (
        <ul className={"sms-list--with-cards"}>
            {
                titlesData.length ?
                    (titlesData.sort((a, b) => sortByName(a, b)).map((t, index) =>
                            <li key={index} className={"title-card"}>
                                <Link to={`/titles/${t.id}`} className={"hocus-standard"} title={t.name + " " + t.start_year}>
                                    <div className={"text-label"}>{t.name}</div>
                                    <div className={"text-label mb-2"}>{t.start_year}</div>
                                    <div className={"image-container mb-2"}>
                                        <img
                                            src={t.image_url}
                                            alt={t.image_filename}
                                            className="w-100"
                                        />
                                    </div>
                                </Link>
                                <TitleTool title={t} displayName={t.name + " " + t.start_year} isCard/>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
