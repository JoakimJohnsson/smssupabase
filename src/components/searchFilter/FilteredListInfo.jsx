import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts.js";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder.jsx";


const FilteredListInfo = ({filteredData, totalData}) => {
    return (
        <p className={"text-uppercase fs-large placeholder-glow"}>
            {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredData ?
                                filteredData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {totalData ? totalData.length :
            <LazyTextPlaceholder charCount={3}/>} {LABELS_AND_HEADINGS.TITLES}
        </p>
    )
};
export default FilteredListInfo;
