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
                                <span className={"px-1 d-inline-block small bg-secondary text-black"}>{t.start_year}</span>
                                <div className={"image-container"}>
                                    <Link to={`/titles/${t.id}`} className={"hocus-standard"} title={t.name + " " + t.start_year}>
                                        <img
                                            src={t.image_url}
                                            alt={t.image_filename}
                                            className="w-100"
                                        />
                                    </Link>
                                </div>
                                <TitleTool title={t} displayName={t.name + " " + t.start_year} isCard/>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
