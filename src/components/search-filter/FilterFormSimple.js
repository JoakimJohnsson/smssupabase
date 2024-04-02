import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


const FilterFormSimple = ({query, setSearchParams, placeholder}) => {
    return (
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS.COMMON.DO_FILTER}</label>
                <div className="input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={query}
                           onChange={e => setSearchParams({query: e.target.value})}
                    />
                    {
                        query !== "" &&
                        <button className="btn btn-primary" onClick={() => setSearchParams({query: ""})}>
                            <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                            {LABELS_AND_HEADINGS.RESET}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
};
export default FilterFormSimple;
