import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {clearInput} from "./filterFunctions";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import FormatFilter from "./FormatFilter";


const FilterFormSimple = ({filterQuery, filterFormat , searchParams, setSearchParams, placeholder, useFormatFilter = false}) => {

    return (
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="filterQuery">{LABELS_AND_HEADINGS.DO_FILTER}</label>
                <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="filterQuery"
                           name="filterQuery"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={filterQuery}
                           onChange={e => setSearchParams({filterQuery: e.target.value})}
                    />
                    {
                        filterQuery !== "" &&
                        <button className="btn btn-primary" onClick={() => clearInput(setSearchParams, useFormatFilter)}>
                            <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                            {LABELS_AND_HEADINGS.RESET}
                        </button>
                    }
                </div>
                {
                    useFormatFilter &&
                    <FormatFilter />
                }
            </div>
        </div>
    )
};
export default FilterFormSimple;
