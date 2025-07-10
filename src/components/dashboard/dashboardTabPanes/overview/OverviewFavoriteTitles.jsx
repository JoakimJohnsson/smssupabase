import React from "react";
import {sortByName} from "../../../../helpers/functions";
import {useAppContext} from "../../../../context/AppContext";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {Link} from "react-router-dom";
import {Icon, userIconDuoTone} from "../../../icons/index.jsx";
import {PANES} from "../../../../helpers/constants/textConstants/texts.js";
import {TitlesListItem} from "../../../pages/titles/TitlesListItem.jsx";
import {SmsListWithCards} from "../../../pages/pagecomponents/SmsListWithCards.jsx";


export const OverviewFavoriteTitles = ({data}) => {

    const {user} = useAppContext();

    return (
        <div className={"col-12"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.TITLES.FAVORITES}</h2>
                {
                    <SmsListWithCards>
                        {
                            data && data.length ?
                                <>
                                    {
                                        data
                                            .sort((a, b) => sortByName(a, b))
                                            .map((title, index) => {
                                                    if (index < 4) {
                                                        return <TitlesListItem key={title.id} title={title}/>
                                                    } else {
                                                        return null;
                                                    }
                                                }
                                            )
                                    }
                                </>
                                :
                                <p>{LABELS.COMMON.NO_FAVORITE_TITLES_USER}</p>
                        }
                    </SmsListWithCards>
                }
                {
                    data && data.length > 4 &&
                    <Link className={"btn btn-outline-primary sms-btn d-inline-block"} to={`/users/${user.id}`}>
                        <Icon icon={userIconDuoTone} className={"me-2"} size={"1x"}/>
                        {PANES.OVERVIEW.SEE_PROFILE_FOR_MORE_FAVORITE_TITLES}
                    </Link>
                }
            </div>
        </div>
    )
}
