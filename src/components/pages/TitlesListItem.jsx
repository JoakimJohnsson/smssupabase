import React, {useState} from "react";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {Link} from "react-router-dom";
import {TitleTool} from "../lists/TitleTool";
import formatData from "../../helpers/valueLists/formats.json";
import {getDataName} from "../../helpers/functions";


export const TitlesListItem = ({title}) => {
    const [userCollectsTitle, setUserCollectsTitle] = useState(false);

    return (

        <li key={title.id} className={"title-card simple"}>
            <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                  title={title.name + " " + title.start_year}>
                <div className={`title-card--year ${userCollectsTitle ? "bg-success" : "bg-secondary"}`}>{getDataName(formatData, title.format_id)} / {title.start_year}</div>
                <div className={"image-container mb-2 position-relative"}>
                    <img
                        src={title.image_url}
                        alt={LABELS.SECTIONS.TITLES.TITLE + " " + title.name}
                        className="w-100"
                        loading={"lazy"}
                    />
                </div>
            </Link>
            <TitleTool title={title} displayName={title.name + " " + title.start_year} isCard setUserCollectsTitle={setUserCollectsTitle}/>
        </li>

    )
}
