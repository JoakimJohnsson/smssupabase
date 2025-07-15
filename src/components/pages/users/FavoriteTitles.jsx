import React from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {sortByName} from "../../../helpers/functions.jsx";
import {TitlesListItem} from "../titles/TitlesListItem.jsx";
import {SmsListWithCards} from "../pagecomponents/SmsListWithCards.jsx";


export const FavoriteTitles = ({data}) => {

    return (
        <div className={"sms-section--light mb-5"}>
            <h2>{LABELS.SECTIONS.TITLES.FAVORITES}</h2>
            {
                <SmsListWithCards>
                    {
                        data ?
                            data
                                .sort((a, b) => sortByName(a, b))
                                .map((title) =>
                                    <TitlesListItem key={title.id} title={title}/>
                                )
                            :
                            <p>{LABELS.COMMON.NO_FAVORITE_ISSUES_USER}</p>
                    }
                </SmsListWithCards>
            }
        </div>
    )
}
