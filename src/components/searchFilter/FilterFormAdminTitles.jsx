import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft, faCircleXmark, faFilter} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {isTrue} from "../../helpers/functions";


const FilterFormFormat = ({
                              setSearchParams,
                              query,
                              isvalued,
                              isnotvalued,
                              placeholder
                          }) => {

    // Initial states to hold our input queries
    const [filterQuery, setFilterQuery] = useState("");
    const [filterIsValued, setFilterIsValued] = useState(false);
    const [filterIsNotValued, setFilterIsNotValued] = useState(false);

    useEffect(() => {
        setFilterQuery(query || "");
        setFilterIsValued(isTrue(isvalued) || false);
        setFilterIsNotValued(isTrue(isnotvalued) || false);
    }, [query, isvalued, isnotvalued]);

    // Pick up search params if provided
    useEffect(() => {
        updateSearchParams();
    }, [filterQuery, filterIsValued, filterIsNotValued]);

    const updateSearchParams = () => {
        setSearchParams({
            query: filterQuery,
            isvalued: filterIsValued,
            isnotvalued: filterIsNotValued
        });
    }

    const handleChange = (e) => {
        setFilterQuery(e.target.value);
    }

    const handleCheckboxChange = (setState, state) => {
        setState(!state);
    }

    const handleReset = () => {
        setFilterQuery("");
    }

    const handleResetAll = () => {
        handleReset();
        setFilterIsValued(false);
        setFilterIsNotValued(false);
    }

    return (
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS.COMMON.DO_FILTER}</label>
                <div className="input-group mb-3 col-8">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={filterQuery}
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className={"input-group"}>

                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={"isvalued"} autoComplete="off"
                               onChange={() => handleCheckboxChange(setFilterIsValued, filterIsValued)} checked={filterIsValued}/>
                        <label className={`btn ${filterIsValued ? "btn-secondary" : "btn-outline-light"} mb-2`} htmlFor={"isvalued"}><FontAwesomeIcon
                            icon={filterIsValued ? faCircleXmark : faFilter} className={"me-2"}/>{TEXTS.GRADE_VALUED}</label>
                    </div>

                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={"isnotvalued"} autoComplete="off"
                               onChange={() => handleCheckboxChange(setFilterIsNotValued, filterIsNotValued)} checked={filterIsNotValued}/>
                        <label className={`btn ${filterIsNotValued ? "btn-secondary" : "btn-outline-light"} mb-2`}
                               htmlFor={"isnotvalued"}><FontAwesomeIcon icon={filterIsNotValued ? faCircleXmark : faFilter} className={"me-2"}/>{TEXTS.GRADE_NOT_VALUED}</label>
                    </div>

                </div>
            </div>
            <button className="btn btn-lg btn-outline-primary mb-3" onClick={() => handleResetAll()}>
                <FontAwesomeIcon icon={faDeleteLeft} className={"me-2"}/>
                {LABELS.COMMON.RESET_FILTER}
            </button>
        </div>
    )
};
export default FilterFormFormat;
