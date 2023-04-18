import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {clearInput} from "./filterFunctions";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";


const FilterForm = ({filter, searchParams, setSearchParams}) => {

    return (
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 col-md-8 col-xl-6 mb-2">
                <label className={"form-label"} htmlFor="filter">{LABELS_AND_HEADINGS.DO_FILTER}</label>
                <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="filter"
                           name="filter"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}
                           value={filter}
                           onChange={e => setSearchParams({filter: e.target.value, sort: searchParams.get("sort")})}
                    />
                    {
                        filter !== "" &&
                        <button className="btn btn-primary" onClick={() => clearInput(setSearchParams, searchParams)}>
                            <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                            {LABELS_AND_HEADINGS.RESET}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
};
export default FilterForm;
